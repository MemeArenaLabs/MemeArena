// battle.gateway.ts

import { WebSocketGateway, OnGatewayConnection } from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { BattleService } from './battle.service';

@WebSocketGateway()
export class BattleGateway implements OnGatewayConnection {
  constructor(private readonly battleService: BattleService) {}

  handleConnection(client: WebSocket) {
    client.on('message', (data: string) => {
      const message = JSON.parse(data);
      const event = message.event;
      const payload = message.data;

      switch (event) {
        case 'FINDING':
          this.battleService.findOpponent(client, payload);
          break;
        case 'PROPOSE_TEAM':
          this.battleService.proposeTeam(client, payload);
          break;

        case 'PROPOSE_SKILL':
          this.battleService.proposeSkill(client, payload);
          break;

        default:
          client.send(
            JSON.stringify({ event: 'ERROR', data: 'Evento desconocido' }),
          );
          break;
      }
    });
  }
}
