import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  ProposeTeamDto,
  ProposeSkillDto,
  FindOpponentDto,
} from './dto/battle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BattleSession,
  BattleSessionAttacksLog,
  BattleSessionUser,
  BattleSessionUserMeme,
} from './battle.entity';
import { Repository } from 'typeorm';
import {
  ActiveBattle,
  ActiveBattles,
  MemeBattleStatus,
  UserInBattle,
  UserMemeState,
} from './battle.type';
import { SkillType, UserMeme } from '../meme/meme.entity';
import { User } from '../user/user.entity';
import { TokenService } from '../token/token.service';
import {
  BASE_DAMAGE_ADDITION,
  BASE_DEFENSE_MULTIPLIER,
  CRITIC_MULTIPLIER,
  DAMAGE_LEVEL_MULTIPLIER,
  ELEMENTS_MODIFIER,
  MINIMUM_DAMAGE,
} from './battle.constants';
import { MemeService } from '../meme/meme.service';
import { UserService } from '../user/user.service';
import { JoinedResponseDto, OpponentDto, ResolvedSkillsResponseDto, TeamProposedResponseDto } from './dto/battle.response.dto';

const ATTACK_CODE = 'attack';
const MEME_DIED_ACTION = 'meme_died';
const SWITCH_ACTION = 'switch';
@Injectable()
export class BattleService {
  private waitingUsers: UserInBattle[] = [];
  private activeBattles: ActiveBattles = new Map();
  private NUMBER_OF_PLAYERS: number = 2;

  constructor(
    @InjectRepository(BattleSession)
    private readonly battleSessionRepository: Repository<BattleSession>,
    @InjectRepository(BattleSessionAttacksLog)
    private readonly battleSessionAttacksLogRepository: Repository<BattleSessionAttacksLog>,
    private readonly tokenService: TokenService,
    private readonly memeService: MemeService,
    private readonly userService: UserService,
  ) {}

  async findOpponent(
    client: WebSocket,
    findOpponentDto: FindOpponentDto,
  ): Promise<void> {
    try {
      client.send(JSON.stringify({ event: 'FINDING_OK' }));
      const { userId, userMemeIds } = findOpponentDto;

      this.waitingUsers.push({
        client,
        userId,
        userMemes: userMemeIds.map((userMemeId) => ({ userMemeId })),
      });

      if (this.waitingUsers.length >= this.NUMBER_OF_PLAYERS) {
        const usersInBattle = this.waitingUsers.splice(
          0,
          this.NUMBER_OF_PLAYERS,
        );
        const battleSessionId = `battle_${Date.now()}`;

        const activeBattle: ActiveBattle = {
          users: usersInBattle,
          memeStates: new Map(),
          proposedSkills: new Map(),
          defeatedMemes: new Map(),
          currentMemes: new Map(),
          battleSessionId,
        };

        const tokenDataMap = await this.tokenService.fetchTokensData();
        const minMaxValues =
          await this.memeService.calculateMinMaxValues(tokenDataMap);

        await Promise.all(
          usersInBattle.map(async (user) => {
            const memeStates: UserMemeState[] = await Promise.all(
              user.userMemes.map(async (userMeme) => {
                const userMemeDetails =
                  await this.memeService.getUserMemeDetails(
                    userMeme.userMemeId,
                  );
                if (!userMemeDetails) {
                  throw new Error(
                    `UserMeme no encontrado: ${userMeme.userMemeId}`,
                  );
                }
                return this.memeService.calculateMemeAttributes(
                  userMemeDetails,
                  tokenDataMap,
                  minMaxValues,
                );
              }),
            );

            activeBattle.memeStates.set(user.userId, memeStates);
            activeBattle.defeatedMemes.set(user.userId, new Set());
          }),
        );

        usersInBattle.forEach((user) => {
          const memeState = activeBattle.memeStates.get(user.userId)[0];
          activeBattle.currentMemes.set(user.userId, memeState);
        });

        this.activeBattles.set(battleSessionId, activeBattle);
        const opponentDetails = await Promise.all(
          usersInBattle.map(async (user, index) => {
            const opponent: UserInBattle = usersInBattle[(index + 1) % this.NUMBER_OF_PLAYERS];
            const userOpponent = await this.userService.findOne(opponent.userId)
            const opponentDetails = await this.userService.findUserByWalletAddress(userOpponent.walletAddress);
            return { userId: user.userId, opponent: opponentDetails };
          })
        );
        usersInBattle.forEach((user) => {
          const opponentData = opponentDetails.find((data) => data.userId === user.userId)?.opponent;
          opponentData.userMemes = opponentData.userMemes.map( meme => {
            console.log({meme})
            return {
              ...meme,
              ...activeBattle.memeStates.get(opponentData.id).find(memeState => meme.userMemeId === memeState.userMemeId)
            }
          })
          const response: JoinedResponseDto = {
            battleSessionId,
            opponent: opponentData as OpponentDto
          }
          user.client.send(
            JSON.stringify({
              event: 'JOINED', data: response
            }),
          );
        });
      }
    } catch (error) {
      client.send(JSON.stringify({ event: 'FINDING_ERROR' }));
    }
  }

  async proposeTeam(client: WebSocket, dto: ProposeTeamDto): Promise<void> {
    try {
      const activeBattle = this.activeBattles.get(dto.battleSessionId);
      if (activeBattle) {
        client.send(JSON.stringify({ event: 'PROPOSE_TEAM_OK' }));
        const userInBattle = activeBattle.users.find(
          (user) => user.userId === dto.userId,
        );
        if (userInBattle) {
          userInBattle.userMemes = dto.team;
          userInBattle.proposed = true;

          const allTeamsProposed = activeBattle.users.every(
            (user) => user.proposed,
          );
          if (allTeamsProposed) {
            const response: TeamProposedResponseDto = {
              teams: activeBattle.users.map((u) => ({
                userId: u.userId,
                team: u.userMemes,
              })),
            }
            activeBattle.users.forEach((user) => {
              user.client.send(
                JSON.stringify({
                  event: 'TEAM_PROPOSED',
                  data: response,
                }),
              );
            });
          }
        }
      } else {
        client.send(JSON.stringify({ event: 'PROPOSE_TEAM_ERROR', data: { message: 'Battle not found'} }));
      }
    } catch (error) {
      client.send(JSON.stringify({ event: 'PROPOSE_TEAM_ERROR', data: {message: error.message} }));
    }
  }
  private async createBattleSession(
    battleSessionId: string,
    usersInBattle: UserInBattle[],
  ): Promise<BattleSession> {
    const newBattleSession = new BattleSession();
    newBattleSession.battleId = battleSessionId;
    newBattleSession.status = 'PENDING';
    newBattleSession.createdAt = new Date();

    newBattleSession.users = usersInBattle.map((userInBattle) => {
      const battleSessionUser = new BattleSessionUser();
      battleSessionUser.user = { id: userInBattle.userId } as User;
      battleSessionUser.memes = userInBattle.userMemes.map(
        (userMemeElement) => {
          const userMeme = { id: userMemeElement.userMemeId } as UserMeme;
          const battleSessionUserMeme = new BattleSessionUserMeme();
          battleSessionUserMeme.userMeme = userMeme;
          return battleSessionUserMeme;
        },
      );
      return battleSessionUser;
    });

    return this.battleSessionRepository.save(newBattleSession);
  }

  getBattleSession(battleSessionId: string): ActiveBattle {
    return this.activeBattles.get(battleSessionId);
  }

  async proposeSkill(client: WebSocket, dto: ProposeSkillDto): Promise<void> {
    try {
      client.send(JSON.stringify({ event: 'PROPOSE_SKILL_OK' }));
      const { battleSessionId, userId } = dto;
      const battleState = this.activeBattles.get(battleSessionId);

      if (!battleState) {
        client.send(
          JSON.stringify({
            event: 'PROPOSE_SKILL_ERROR',
            message: 'Battle session not found',
          }),
        );
        return;
      }

      battleState.proposedSkills.set(userId, dto);

      if (battleState.proposedSkills.size === this.NUMBER_OF_PLAYERS) {
        const { battleOver, results } = await this.resolveSkills(battleState);

        battleState.users.forEach((user) => {
          const response: ResolvedSkillsResponseDto = results[user.userId]
          user.client.send(
            JSON.stringify({
              event: 'RESOLVED_SKILLS',
              data: response,
            }),
          );
        });
        if (battleOver) {
          this.finishBattle(battleState.battleSessionId);
        }

      }
    } catch (error) {
      console.log(error);
      client.send(
        JSON.stringify({
          event: 'PROPOSE_SKILL_ERROR',
          message: error.message,
        }),
      );
    }
  }

  private async resolveSkills(
    battleState: ActiveBattle,
  ): Promise<{ [userId: string]: any }> {
    const results = {};
    const proposedSkills = Array.from(battleState.proposedSkills.values());
    let battleLogs: BattleSessionAttacksLog[] = [];

    battleState.proposedSkills.clear();

    const skillMemeMap = new Map<string, ProposeSkillDto>();

    for (const skill of proposedSkills) {
      skillMemeMap.set(skill.userMemeId, skill);
    }

    const [userA, userB] = battleState.users;
    const memeUserA = battleState.currentMemes.get(userA.userId);
    const memeUserB = battleState.currentMemes.get(userB.userId);

    const skill1 = skillMemeMap.get(memeUserA.userMemeId);
    const skill2 = skillMemeMap.get(memeUserB.userMemeId);


    if (memeUserA.speed > memeUserB.speed) {
      const { attackLogs, defenderDefeated } = await this.calculateDamage(
        battleState,
        userA,
        userB,
        memeUserA,
        memeUserB,
        skill1,
      );
      battleLogs.push(...attackLogs)
      if (!defenderDefeated) {
        const { attackLogs } = await this.calculateDamage(
          battleState,
          userB,
          userA,
          memeUserB,
          memeUserA,
          skill2,
        );
        battleLogs.push(...attackLogs)
      }
    } else {
      const { attackLogs, defenderDefeated } = await this.calculateDamage(
        battleState,
        userB,
        userA,
        memeUserB,
        memeUserA,
        skill2,
      );
      battleLogs.push(...attackLogs)
      if (!defenderDefeated) {
        await this.calculateDamage(
          battleState,
          userA,
          userB,
          memeUserA,
          memeUserB,
          skill1,
        );
        battleLogs.push(...attackLogs)
      }
    }
    const { battleOver } = await this.checkBattleOver(battleState);

    for (const user of battleState.users) {
      const userId = user.userId;
      const opponentUser = battleState.users.find(u => u.userId !== userId);

      results[user.userId] = {
        battleSessionId: battleState.battleSessionId,
        battleLogs,
        userData: this.getUserBattleData(userId, battleState),
        opponentData:  this.getUserBattleData(opponentUser.userId, battleState),
      };
    };

    return { battleOver, results };
  }

  private getUserBattleData(userId: string, battleState: ActiveBattle){
    const userMemesStates = battleState.memeStates.get(userId);
    const currentMeme = battleState.currentMemes.get(userId);
    const defeatedMemes = battleState.defeatedMemes.get(userId);

    const userMemes = userMemesStates.map(memeState => {
      let status: MemeBattleStatus;
      if (defeatedMemes.has(memeState.userMemeId)) {
        status = MemeBattleStatus.Defeated;
      } else if (memeState.userMemeId === currentMeme.userMemeId) {
        status = MemeBattleStatus.Active;
      } else {
        status = MemeBattleStatus.Bench;
      }

      return {
        attack: memeState.attack,
        defense: memeState.defense,
        element: memeState.element,
        currentHp: memeState.currentHp,
        hp: memeState.hp,
        level: memeState.level,
        memeId: memeState.userMemeId,
        speed: memeState.speed,
        status,
        userMemeId: memeState.userMemeId,
      };
    });

    return {
      id: userId,
      userMemes,
    };
  }

  private async calculateDamage(
    battleState: ActiveBattle,
    userAttacker: UserInBattle,
    userDefender: UserInBattle,
    attacker: UserMemeState,
    defender: UserMemeState,
    skillDto: ProposeSkillDto,
  ): Promise<{ attackLogs: BattleSessionAttacksLog[], defenderDefeated: boolean }> {
    const skill = await this.memeService.getSkill(skillDto.skillId);
    const attackLogs: BattleSessionAttacksLog[] = [];
    let defenderDefeated = false;
    let defenderDefeat: BattleSessionAttacksLog;
    if(skill.skillType === SkillType.SWITCH){
      const newMeme = battleState.memeStates.get(userAttacker.userId).find(
        (meme) => meme.userMemeId === skillDto.newUserMemeId,
      );

      battleState.currentMemes.set(userAttacker.userId, newMeme);

      const switchLog = await this.logAttack(
        battleState.battleSessionId,
        userAttacker.userId,
        null,
        skill.id,
        SWITCH_ACTION,
        0,
      );
      attackLogs.push(switchLog);

      return { attackLogs, defenderDefeated: false };
    }

    const skillPower = skill.damage;
    const levelToken = attacker.level;
    const elementModifier =
      ELEMENTS_MODIFIER[attacker.element][defender.element];
    const isCriticalHit = Math.random() < attacker.criticChance;

    const criticModifier = isCriticalHit ? CRITIC_MULTIPLIER : 1;
    
    const damage =
      (((DAMAGE_LEVEL_MULTIPLIER * levelToken + BASE_DAMAGE_ADDITION) *
      skillPower *
      (attacker.attack / defender.defense)) / BASE_DEFENSE_MULTIPLIER +
        BASE_DAMAGE_ADDITION) *
      elementModifier *
      criticModifier;

    const damageInt = Math.floor(damage);
    defender.currentHp -= damageInt;
    const attackerLog = await this.logAttack(
      battleState.battleSessionId,
      userAttacker.userId,
      userDefender.userId,
      skillDto.skillId,
      ATTACK_CODE,
      damageInt,
    );
    attackLogs.push(attackerLog)

    if (defender.currentHp <= 0) {
      defender.currentHp = 0;
      defenderDefeated = true
      battleState.defeatedMemes
        .get(userDefender.userId)
        .add(defender.userMemeId);
      defenderDefeat = await this.logAttack(
        battleState.battleSessionId,
        userDefender.userId,
        null,
        null,
        MEME_DIED_ACTION,
        0,
      );
      attackLogs.push(defenderDefeat)
    }
    return { attackLogs, defenderDefeated };
  }

  private async logAttack(
    battleSessionId: string,
    attackerId: string,
    receiverId: string,
    skillId: string,
    actionType: string,
    damage: number,
  ): Promise<BattleSessionAttacksLog> {
    const attackLog = new BattleSessionAttacksLog();
    attackLog.battleSessionId = battleSessionId;
    attackLog.timestamp = new Date();
    attackLog.attackerId = attackerId;
    attackLog.receiverId = receiverId;
    attackLog.skillId = skillId;
    attackLog.actionType = actionType;
    attackLog.damage = damage;
    console.log({ attackLog });
    await this.battleSessionAttacksLogRepository.save(attackLog);
    return attackLog;
  }

  private async checkBattleOver(battleState: ActiveBattle): Promise<{ battleOver: boolean, logs: BattleSessionAttacksLog[] }> {
    let battleOver = false;
    const memeChanges = [];
    const logs: BattleSessionAttacksLog[] = []
    for (const user of battleState.users) {
      const userMemeState = battleState.currentMemes.get(user.userId);
      if (userMemeState.hp <= 0) {
        const defeatedMemes = battleState.defeatedMemes.get(user.userId);
        defeatedMemes.add(userMemeState.userMemeId);

        const allMemes = battleState.memeStates.get(user.userId);
        const remainingMemes = allMemes.filter(
          (meme) => !defeatedMemes.has(meme.userMemeId),
        );

        if (remainingMemes.length > 0) {
          const nextMeme = remainingMemes[0];
          battleState.currentMemes.set(user.userId, nextMeme);

          const switchMemeLog = await this.logAttack(
            battleState.battleSessionId,
            user.userId,
            null,
            null,
            SWITCH_ACTION,
            0,
          );
          logs.push(switchMemeLog)
          memeChanges.push({
            userId: user.userId,
            memeDefeated: true,
            newMeme: nextMeme,
          });
        }
      } 
    }
    return { battleOver, logs };
  }

  finishBattle(battleSessionId: string): void {
    const battleState = this.activeBattles.get(battleSessionId);
    if (battleState) {
      battleState.users.forEach((user) => {
        user.client.send(
          JSON.stringify({
            event: 'FINISHED',
            data: { message: 'Battle over' },
          }),
        );
      });

      this.activeBattles.delete(battleSessionId);
    }
  }
}
