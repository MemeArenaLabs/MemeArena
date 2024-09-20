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
import { ActiveBattle, ActiveBattles, UserInBattle, UserMemeState } from './battle.type';
import { UserMeme } from '../meme/meme.entity';
import { User } from '../user/user.entity';
import { TokenService } from '../token/token.service';
import { BASE_DAMAGE_ADDITION, BASE_DEFENSE_MULTIPLIER, CRITIC_MULTIPLIER, DAMAGE_LEVEL_MULTIPLIER, ELEMENTS_MODIFIER, MINIMUM_DAMAGE } from './battle.constants';
import { MemeService } from '../meme/meme.service';

const ATTACK_CODE = 'attack'
const MEME_DIED_ACTION = 'meme_died'
const SWITCH_ACTION = 'switch'
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
  ) {}

  async findOpponent(client: WebSocket, findOpponentDto: FindOpponentDto): Promise<void> {
    client.send(JSON.stringify({ event: 'FINDING_OK' }));
    const { userId, userMemeIds } = findOpponentDto;
    
    this.waitingUsers.push({
      client,
      userId,
      userMemes: userMemeIds.map((userMemeId) => ({ userMemeId })),
    });
  
    // Verificamos si hay suficientes jugadores para comenzar la batalla
    if (this.waitingUsers.length >= this.NUMBER_OF_PLAYERS) {
      const usersInBattle = this.waitingUsers.splice(0, this.NUMBER_OF_PLAYERS);
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
      const minMaxValues = await this.memeService.calculateMinMaxValues(tokenDataMap);
  
      await Promise.all(
        usersInBattle.map(async (user) => {
          const memeStates: UserMemeState[] = await Promise.all(
            user.userMemes.map(async (userMeme) => {
              const userMemeDetails = await this.memeService.getUserMemeDetails(userMeme.userMemeId);
              if (!userMemeDetails) {
                throw new Error(`UserMeme no encontrado: ${userMeme.userMemeId}`);
              }
              return this.memeService.calculateMemeAttributes(
                userMemeDetails,
                tokenDataMap,
                minMaxValues,
              );
            })
          );
  
          activeBattle.memeStates.set(user.userId, memeStates);
          activeBattle.defeatedMemes.set(user.userId, new Set());
        })
      );
  
      usersInBattle.forEach((user) => {
        const memeState = activeBattle.memeStates.get(user.userId)[0];
        activeBattle.currentMemes.set(user.userId, memeState);
      });
  
      this.activeBattles.set(battleSessionId, activeBattle);
  
      usersInBattle.forEach((user) => {
        user.client.send(
          JSON.stringify({ event: 'JOINED', data: { battleSessionId } }),
        );
      });
    }
  }
  


  async proposeTeam(client: WebSocket, dto: ProposeTeamDto): Promise<void> {
    const activeBattle = this.activeBattles.get(dto.battleSessionId);
    console.log({activeBattlesMap: this.activeBattles})
    console.log({activeBattle})
    if (activeBattle) {
      client.send(JSON.stringify({ event: 'PROPOSE_TEAM_OK' }));
      const userInBattle = activeBattle.users.find(
        (user) => user.userId === dto.userId,
      );
      console.log({userInBattle})
      if (userInBattle) {
        userInBattle.userMemes = dto.team;
        userInBattle.proposed = true;

        const allTeamsProposed = activeBattle.users.every(
          (user) => user.proposed,
        );
        console.log({allTeamsProposed})
        if (allTeamsProposed) {
          activeBattle.users.forEach((user) => {
            user.client.send(
              JSON.stringify({
                event: 'TEAM_PROPOSED',
                data: {
                  teams: activeBattle.users.map((u) => ({
                    userId: u.userId,
                    team: u.userMemes,
                  })),
                },
              }),
            );
          });
        }
      }
    } else {
      client.send(JSON.stringify({ event: 'PROPOSE_TEAM_ERROR' }));
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
      const results = await this.resolveSkills(battleState);

      battleState.users.forEach((user) => {
        user.client.send(
          JSON.stringify({ event: 'RESOLVED_SKILLS', data: results[user.userId] }),
        );
      });

      const isBattleOver = this.checkBattleOver(battleState);
      if (isBattleOver) {
        this.finishBattle(battleState.battleSessionId);
      }
    }
  }

  private async resolveSkills(
    battleState: ActiveBattle,
  ): Promise<{ [userId: string]: any }> {
    const results = {};
    const proposedSkills = Array.from(battleState.proposedSkills.values());

    battleState.proposedSkills.clear();

    const skillMemeMap = new Map<string, ProposeSkillDto>();
    for (const skill of proposedSkills) {
      skillMemeMap.set(skill.memeId, skill);
    }
    const [userA, userB] = battleState.users;
    const memeUserA = battleState.currentMemes.get(userA.userId)
    const memeUserB = battleState.currentMemes.get(userB.userId)

    const skill1 = skillMemeMap.get(memeUserA.userMemeId);
    const skill2 = skillMemeMap.get(memeUserB.userMemeId);

    if(memeUserA.speed > memeUserB.speed){
      const { defenderDefeated } = await this.calculateDamage(
        battleState,
        userA,
        userB,
        memeUserA,
        memeUserB,
        skill1.skillId,
      );
      if(!defenderDefeated){
        await this.calculateDamage(
          battleState,
          userB,
          userA,
          memeUserB,
          memeUserA,
          skill2.skillId,
        );
      }
    } else {
      const { defenderDefeated } = await this.calculateDamage(
        battleState,
        userB,
        userA,
        memeUserB,
        memeUserA,
        skill2.skillId,
      );
      if(!defenderDefeated){
        await this.calculateDamage(
          battleState,
          userA,
          userB,
          memeUserA,
          memeUserB,
          skill1.skillId,
        );
      }
    }

    results[userA.userId] = {
      opponentMemeHp: memeUserB.hp,
      ownMemeHp: memeUserA.hp,
    };

    results[userB.userId] = {
      opponentMemeHp: memeUserA.hp,
      ownMemeHp: memeUserB.hp,
    };

    return results;
  }
// battle.service.ts

private async calculateDamage(
  battleState: ActiveBattle,
  userAttacker: UserInBattle,
  userDefender: UserInBattle,
  attacker: UserMemeState,
  defender: UserMemeState,
  skillId: string,
): Promise<{ defenderDefeated: boolean }> {
  const skill = this.getSkill(skillId);
  const skillPower = skill.damage;

  const levelToken = attacker.levelToken;

  const elementModifier = ELEMENTS_MODIFIER[attacker.element][defender.element];

  const isCriticalHit = Math.random() < attacker.criticChance;
  const criticModifier = isCriticalHit ? CRITIC_MULTIPLIER : 1;

  const damage =
    ((DAMAGE_LEVEL_MULTIPLIER * levelToken + BASE_DAMAGE_ADDITION) *
      skillPower *
      (attacker.attack / (defender.defense * BASE_DEFENSE_MULTIPLIER) + 2) *
      elementModifier *
      criticModifier);

  const finalDamage = Math.max(damage, MINIMUM_DAMAGE);

  defender.hp -= finalDamage;

  await this.logAttack(
    battleState.battleSessionId,
    userAttacker.userId,
    userDefender.userId,
    skillId,
    ATTACK_CODE,
    finalDamage,
  );

  let defenderDefeated = false;

  if (defender.hp <= 0) {
    defender.hp = 0;
    defenderDefeated = true;
    battleState.defeatedMemes
      .get(userDefender.userId)
      .add(defender.userMemeId);
    await this.logAttack(
      battleState.battleSessionId,
      userDefender.userId,
      null,
      null,
      MEME_DIED_ACTION,
      0,
    );
  }

  return { defenderDefeated };
}



  private async logAttack(
    battleSessionId: string,
    attackerId: string,
    receiverId: string,
    skillId: string,
    actionType: string,
    damage: number,
  ): Promise<void> {
    const attackLog = new BattleSessionAttacksLog();
    attackLog.battleSessionId = battleSessionId;
    attackLog.timestamp = new Date();
    attackLog.attackerId = attackerId;
    attackLog.receiverId = receiverId;
    attackLog.skillId = skillId;
    attackLog.actionType = actionType;
    attackLog.damage = damage;

    await this.battleSessionAttacksLogRepository.save(attackLog);
  }


  private async checkBattleOver(battleState: ActiveBattle): Promise<boolean> {
    let battleOver = false;
  
    for (const user of battleState.users) {
      const userMemeState = battleState.currentMemes.get(user.userId);
  
      if (userMemeState.hp <= 0) {
        const defeatedMemes = battleState.defeatedMemes.get(user.userId);
        defeatedMemes.add(userMemeState.userMemeId);
  
        const allMemes = battleState.memeStates.get(user.userId);
        const remainingMemes = allMemes.filter(
          (meme) => !defeatedMemes.has(meme.userMemeId)
        );
  
        if (remainingMemes.length > 0) {
          const nextMeme = remainingMemes[0];
          battleState.currentMemes.set(user.userId, nextMeme);
  
          await this.logAttack(
            battleState.battleSessionId,
            user.userId,
            null,
            null,
            SWITCH_ACTION,
            0,
          );
        } else {
          battleOver = true;
        }
      }
    }
    return battleOver;
  }


  finishBattle(battleSessionId: string): void {
    const battleState = this.activeBattles.get(battleSessionId);
    if (battleState) {
      battleState.users.forEach((user) => {
        user.client.send(
          JSON.stringify({ event: 'FINISHED', data: { message: 'Battle over' } }),
        );
      });

      this.activeBattles.delete(battleSessionId);
    }
  }


  getSkill(skillId: string) {
    return { id:skillId, damage:10}
  }
}

