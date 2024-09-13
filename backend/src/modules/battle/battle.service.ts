import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
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
import { ActiveBattle, ActiveBattles, UserInBattle } from './battle.type';
import { UserMeme } from '../meme/meme.entity';
import { User } from '../user/user.entity';

@Injectable()
export class BattleService {
  @WebSocketServer() private server: Server;

  private waitingUsers: UserInBattle[] = [];
  private activeBattles: ActiveBattles = new Map();
  private NUMBER_OF_PLAYERS: number = 2;

  constructor(
    @InjectRepository(BattleSession)
    private readonly battleSessionRepository: Repository<BattleSession>,
    @InjectRepository(BattleSessionAttacksLog)
    private readonly battleSessionAttacksLogRepository: Repository<BattleSessionAttacksLog>,
  ) {}

  findOpponent(client: WebSocket, findOpponentDto: FindOpponentDto): void {
    const { userId, userMemeIds } = findOpponentDto;
    this.waitingUsers.push({
      client,
      userId,
      userMemes: userMemeIds.map((userMemeId) => ({ userMemeId })),
    });
    client.send(JSON.stringify({ event: 'FINDING_OK' }));
    if (this.waitingUsers.length >= this.NUMBER_OF_PLAYERS) {
      const usersInBattle = this.waitingUsers.splice(0, this.NUMBER_OF_PLAYERS);
      const battleSessionId = `battle_${Date.now()}`;
      const activeBattle: ActiveBattle = {
        users: usersInBattle,
        currentMemes: new Map(),
        proposedSkills: new Map(),
        defeatedMemes: new Map(),
        battleSessionId,
      };
      usersInBattle.forEach((user) => {
        const firstMeme = user.userMemes[0];
        activeBattle.currentMemes.set(user.userId, {
          userMemeId: firstMeme.userMemeId,
          hp: 100,
        });
        activeBattle.defeatedMemes.set(user.userId, new Set());
        // Enviar el mensaje 'JOINED' a cada usuario
        user.client.send(
          JSON.stringify({ event: 'JOINED', data: { battleSessionId } }),
        );
      });
      this.activeBattles.set(battleSessionId, activeBattle);
    }
  }

  async proposeTeam(client: WebSocket, dto: ProposeTeamDto): Promise<void> {
    const activeBattle = this.activeBattles.get(dto.battleSessionId);

    if (activeBattle) {
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

  removePlayerFromQueue(client: Socket): void {
    this.waitingUsers = this.waitingUsers.filter(
      (player) => player.userId !== client.id,
    );
  }

  getBattleSession(battleSessionId: string): ActiveBattle {
    return this.activeBattles.get(battleSessionId);
  }
  async proposeSkill(client: Socket, dto: ProposeSkillDto): Promise<void> {
    const { battleSessionId, userId } = dto;
    const battleState = this.activeBattles.get(battleSessionId);

    if (!battleState) {
      client.emit('ERROR', { message: 'Battle session not found' });
      return;
    }

    battleState.proposedSkills.set(userId, dto);

    if (battleState.proposedSkills.size === this.NUMBER_OF_PLAYERS) {
      const results = await this.resolveSkills(battleState);

      battleState.users.forEach((user) => {
        user.client.emit('RESOLVED_SKILLS', results[user.userId]);
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

    // Limpiar las habilidades propuestas para la próxima ronda
    battleState.proposedSkills.clear();

    // Obtener los usuarios y sus estados
    const [skill1, skill2] = proposedSkills;
    const user1 = battleState.users.find((u) => u.userId === skill1.userId);
    const user2 = battleState.users.find((u) => u.userId === skill2.userId);

    const user1MemeState = battleState.currentMemes.get(user1.userId);
    const user2MemeState = battleState.currentMemes.get(user2.userId);

    // Resolver ataques (simplificado, puedes ajustar según tu lógica)
    const damageToUser2 = this
      .calculateDamage
      // skill1,
      // user1MemeState,
      // user2MemeState,
      ();
    user2MemeState.hp -= damageToUser2;

    await this.logAttack(
      battleState.battleSessionId,
      user1.userId,
      user2.userId,
      skill1.skillId,
      'attack',
      damageToUser2,
    );

    let user2MemeDefeated = false;
    if (user2MemeState.hp <= 0) {
      user2MemeState.hp = 0;
      user2MemeDefeated = true;
      battleState.defeatedMemes
        .get(user2.userId)
        .add(user2MemeState.userMemeId);

      await this.logAttack(
        battleState.battleSessionId,
        user2.userId,
        null,
        null,
        'meme_died',
        0,
      );
    }

    if (!user2MemeDefeated) {
      const damageToUser1 = this
        .calculateDamage
        // skill2,
        // user2MemeState,
        // user1MemeState,
        ();
      user1MemeState.hp -= damageToUser1;

      await this.logAttack(
        battleState.battleSessionId,
        user2.userId,
        user1.userId,
        skill2.skillId,
        'attack',
        damageToUser1,
      );

      if (user1MemeState.hp <= 0) {
        user1MemeState.hp = 0;
        battleState.defeatedMemes
          .get(user1.userId)
          .add(user1MemeState.userMemeId);

        await this.logAttack(
          battleState.battleSessionId,
          user1.userId,
          null,
          null,
          'meme_died',
          0,
        );
      }
    }

    // Preparar los resultados para cada jugador
    results[user1.userId] = {
      opponentMemeHp: user2MemeState.hp,
      ownMemeHp: user1MemeState.hp,
    };

    results[user2.userId] = {
      opponentMemeHp: user1MemeState.hp,
      ownMemeHp: user2MemeState.hp,
    };

    return results;
  }

  private calculateDamage(): number {
    // Aquí puedes implementar tu lógica de cálculo de daño
    // Por simplicidad, devolveremos un daño fijo
    return 10; // Ajusta según sea necesario
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

  private checkBattleOver(battleState: ActiveBattle): boolean {
    let battleOver = false;

    battleState.users.forEach((user) => {
      const userMemeState = battleState.currentMemes.get(user.userId);

      if (userMemeState.hp <= 0) {
        // Verificar si el jugador tiene más memes disponibles
        const remainingMemes = user.userMemes.filter(
          (meme) =>
            !battleState.defeatedMemes.get(user.userId).has(meme.userMemeId),
        );

        if (remainingMemes.length > 0) {
          // Cambiar al siguiente meme
          const nextMeme = remainingMemes[0];
          battleState.currentMemes.set(user.userId, {
            userMemeId: nextMeme.userMemeId,
            hp: 100, // O el HP real del meme
          });

          // Registrar el cambio de meme
          this.logAttack(
            battleState.battleSessionId,
            user.userId,
            null,
            null,
            'switch',
            0,
          );
        } else {
          // El jugador no tiene más memes, la batalla ha terminado
          battleOver = true;
        }
      }
    });

    return battleOver;
  }

  finishBattle(battleSessionId: string): void {
    const battleState = this.activeBattles.get(battleSessionId);
    if (battleState) {
      battleState.users.forEach((user) => {
        user.client.emit('FINISHED', { message: 'Battle over' });
      });

      this.activeBattles.delete(battleSessionId);
    }
  }
}
