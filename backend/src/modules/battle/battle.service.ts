import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { ProposeTeamDto, ProposeSkillDto, FindOpponentDto } from './dto/battle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BattleSession, BattleSessionUser, BattleSessionUserMeme } from './battle.entity';
import { Repository } from 'typeorm';
import { ActiveBattles, UserInBattle } from './battle.type';
import { UserMeme } from '../meme/meme.entity';
import { User } from '../user/user.entity';

@Injectable()
export class BattleService {
  @WebSocketServer() private server: Server;

  private waitingUsers: UserInBattle[] = [];
  private activeBattles: ActiveBattles = new Map();
  private NUMBER_OF_PLAYERS: number = 2

  constructor(
    @InjectRepository(BattleSession)
    private readonly battleSessionRepository: Repository<BattleSession>
  ) {}
  
  findOpponent(client: Socket, findOpponentDto: FindOpponentDto): void {
    const { userId, userMemeIds } = findOpponentDto;
    this.waitingUsers.push({ client, userId, userMemeIds });

    if (this.waitingUsers.length >= this.NUMBER_OF_PLAYERS) {
      const usersInBattle = this.waitingUsers.splice(0, this.NUMBER_OF_PLAYERS);
      const battleSessionId = `battle_${Date.now()}`;
      this.activeBattles.set(battleSessionId, usersInBattle);
      this.createBattleSession(battleSessionId, usersInBattle);

      usersInBattle.forEach(({ client }) => {
        client.join(battleSessionId);
        client.emit('JOINED', { battleSessionId });
      });
    }
  }

  private async createBattleSession(
    battleSessionId: string,
    usersInBattle: UserInBattle[]
  ): Promise<BattleSession> {
    const newBattleSession = new BattleSession();
    newBattleSession.id = battleSessionId;
    newBattleSession.status = 'PENDING';
    newBattleSession.createdAt = new Date();
    
    newBattleSession.users = usersInBattle.map((userInBattle) => {

      const battleSessionUser = new BattleSessionUser();
      battleSessionUser.user = { id: userInBattle.userId } as User;
      battleSessionUser.memes = userInBattle.userMemeIds.map((userMemeId) => {
        const userMeme = { id: userMemeId } as UserMeme;
        const battleSessionUserMeme = new BattleSessionUserMeme();
        battleSessionUserMeme.userMeme = userMeme
        return battleSessionUserMeme;
      });
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

  proposeTeam(client: Socket, dto: ProposeTeamDto) {
    const opponentId = this.activeBattles.get(client.id);
    if (opponentId) {
      // Enviar al oponente la propuesta de equipo
      // this.server.to(opponentId).emit('TEAM_PROPOSED', { team: dto.team });
    }
  }

  proposeSkill(client: Socket, dto: ProposeSkillDto) {
    const opponentId = this.activeBattles.get(client.id);
    if (opponentId) {
      // Resolver habilidades y enviar resultados a ambos jugadores
      this.server.to(client.id).emit('RESOLVE_SKILLS', { result: 'resolved' });
      // this.server.to(opponentId).emit('RESOLVE_SKILLS', { result: 'resolved' });
    }
  }

  finishBattle(client: Socket) {
    const opponentId = this.activeBattles.get(client.id);

    if (opponentId) {
      // Enviar mensaje de fin de batalla a ambos jugadores
      this.server.to(client.id).emit('FINISH');
      // this.server.to(opponentId).emit('FINISH');

      // Eliminar la batalla activa
      this.activeBattles.delete(client.id);
      // this.activeBattles.delete(opponentId);
    }
  }
}
