import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { BattleService } from './battle.service';
import {
  ProposeTeamDto,
  ProposeSkillDto,
  FindOpponentDto,
} from './dto/battle.dto';

@WebSocketGateway()
export class BattleGateway {
  constructor(private readonly battleService: BattleService) {}

  @SubscribeMessage('FINDING')
  handleFinding(
    @MessageBody() findOpponentDto: FindOpponentDto,
    @ConnectedSocket() client: Socket,
  ): void {
    this.battleService.findOpponent(client, findOpponentDto);
  }

  @SubscribeMessage('PROPOSE_TEAM')
  handleProposeTeam(
    @MessageBody() proposeTeamDto: ProposeTeamDto,
    @ConnectedSocket() client: Socket,
  ): void {
    this.battleService.proposeTeam(client, proposeTeamDto);
  }

  @SubscribeMessage('PROPOSE_SKILL')
  handleProposeSkill(
    @MessageBody() proposeSkillDto: ProposeSkillDto,
    @ConnectedSocket() client: Socket,
  ): void {
    this.battleService.proposeSkill(client, proposeSkillDto);
  }
}
