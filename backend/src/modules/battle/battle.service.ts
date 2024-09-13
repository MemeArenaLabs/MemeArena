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
  BattleSessionUser,
  BattleSessionUserMeme,
} from './battle.entity';
import { Repository } from 'typeorm';
import { activeBattle, ActiveBattles, UserInBattle } from './battle.type';
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
  ) {}

  findOpponent(client: Socket, findOpponentDto: FindOpponentDto): void {
    const { userId, userMemeIds } = findOpponentDto;
    this.waitingUsers.push({
      client,
      userId,
      userMemes: userMemeIds.map((userMemeId) => ({ userMemeId })),
    });
    client.emit('FINDING_OK');

    if (this.waitingUsers.length >= this.NUMBER_OF_PLAYERS) {
      const usersInBattle = this.waitingUsers.splice(0, this.NUMBER_OF_PLAYERS);
      const battleSessionId = `battle_${Date.now()}`;

      // Inicializar el estado de la batalla
      const battleState: activeBattle = {
        users: usersInBattle,
        currentMemes: new Map(),
        proposedSkills: new Map(),
        defeatedMemes: new Map(),
        battleSessionId,
      };

      // Inicializar el meme actual y los memes derrotados para cada jugador
      usersInBattle.forEach((user) => {
        const firstMeme = user.userMemes[0];
        battleState.currentMemes.set(user.userId, {
          userMemeId: firstMeme.userMemeId,
          hp: 100, // O el HP real del meme
        });
        battleState.defeatedMemes.set(user.userId, new Set());
      });

      this.activeBattles.set(battleSessionId, battleState);
      this.createBattleSession(battleSessionId, usersInBattle);

      usersInBattle.forEach(({ client }) => {
        client.emit('JOINED', { battleSessionId });
      });
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

  getBattleSession(battleSessionId: string): UserInBattle[] {
    return this.activeBattles.get(battleSessionId);
  }

  async proposeTeam(client: Socket, dto: ProposeTeamDto): Promise<void> {
    const activeBattle = this.activeBattles.get(dto.battleSessionId);
    const battleSession = await this.battleSessionRepository.findOne({
      where: { battleId: dto.battleSessionId },
      relations: ['users', 'users.memes'],
    });

    if (battleSession) {
      const battleUser = battleSession.users.find(
        (user) => user.user.id === dto.userId,
      );
      if (battleUser) {
        const usersInBattle = activeBattle.map((user) => {
          if (user.userId === dto.userId) {
            return {
              ...user,
              userMemes: dto.team,
              proposed: true,
            };
          }
          return user;
        });

        this.activeBattles.set(dto.battleSessionId, usersInBattle);

        const allTeamsProposed = activeBattle.every(
          (user: UserInBattle) => user.proposed,
        );

        if (allTeamsProposed) {
          activeBattle.forEach((user) => {
            user.client.emit('TEAM_PROPOSED', {
              teams: activeBattle.map((u) => ({
                userId: u.userId,
                team: u.userMemes,
              })),
            });
          });
        }
      }
    }
  }
  proposeSkill(client: Socket, dto: ProposeSkillDto) {
    const opponentId = this.activeBattles.get(client.id);
    if (opponentId) {
      // Resolver habilidades y enviar resultados a ambos jugadores
      this.server.to(client.id).emit('RESOLVED_SKILLS', { result: 'resolved' });
      // this.server.to(opponentId).emit('RESOLVE_SKILLS', { result: 'resolved' });
    }
  }

  finishBattle(client: Socket) {
    const opponentId = this.activeBattles.get(client.id);

    if (opponentId) {
      // Enviar mensaje de fin de batalla a ambos jugadores
      this.server.to(client.id).emit('FINISHED');
      // this.server.to(opponentId).emit('FINISH');

      // Eliminar la batalla activa
      this.activeBattles.delete(client.id);
      // this.activeBattles.delete(opponentId);
    }
  }
}
