// test/battle.e2e-spec.ts

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as WebSocket from 'ws';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BattleSession,
  BattleSessionAttacksLog,
  BattleSessionUser,
  BattleSessionUserMeme,
} from '../../src/modules/battle/battle.entity';
import { BattleModule } from '../../src/modules/battle/battle.module';
import { WsAdapter } from '@nestjs/platform-ws';

describe('BattleGateway (e2e)', () => {
  let app: INestApplication;
  let clientSocket1: WebSocket;
  let clientSocket2: WebSocket;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BattleModule],
    })
      .overrideProvider(getRepositoryToken(BattleSession))
      .useValue({})
      .overrideProvider(getRepositoryToken(BattleSessionAttacksLog))
      .useValue({})
      .overrideProvider(getRepositoryToken(BattleSessionUser))
      .useValue({})
      .overrideProvider(getRepositoryToken(BattleSessionUserMeme))
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    app.useWebSocketAdapter(new WsAdapter(app));

    await app.listen(3002);
  });

  afterAll(async () => {
    await app.close();
  });

  it('debe permitir que dos clientes encuentren oponentes y reciban mensajes correctos', (done) => {
    clientSocket1 = new WebSocket('ws://localhost:3002');
    clientSocket2 = new WebSocket('ws://localhost:3002');
    clientSocket1.on('error', (error) => {
      console.error('Error en clientSocket1:', error);
    });

    clientSocket1.on('close', (code, reason) => {
      console.log(`clientSocket1 cerrado: Código ${code}, Razón: ${reason}`);
    });

    clientSocket2.on('error', (error) => {
      console.error('Error en clientSocket2:', error);
    });

    clientSocket2.on('close', (code, reason) => {
      console.log(`clientSocket2 cerrado: Código ${code}, Razón: ${reason}`);
    });
    let findingOkCount = 0;
    let joinedCount = 0;

    function checkCompletion() {
      console.log({ findingOkCount, joinedCount });
      if (findingOkCount === 2 && joinedCount === 2) {
        done();
      }
    }

    clientSocket1.on('open', () => {
      const message = {
        event: 'FINDING',
        data: {
          userId: 'user1',
          userMemeIds: ['meme1', 'meme2'],
        },
      };
      clientSocket1.send(JSON.stringify(message));
    });

    clientSocket1.on('message', (data) => {
      const message = JSON.parse(data.toString());
      if (message.event === 'FINDING_OK') {
        findingOkCount++;
        checkCompletion();
      } else if (message.event === 'JOINED') {
        expect(message.data).toHaveProperty('battleSessionId');
        joinedCount++;
        checkCompletion();
      }
    });

    clientSocket2.on('open', () => {
      const message = {
        event: 'FINDING',
        data: {
          userId: 'user2',
          userMemeIds: ['meme3', 'meme4'],
        },
      };
      clientSocket2.send(JSON.stringify(message));
    });

    clientSocket2.on('message', (data) => {
      const message = JSON.parse(data.toString());
      if (message.event === 'FINDING_OK') {
        findingOkCount++;
        checkCompletion();
      } else if (message.event === 'JOINED') {
        expect(message.data).toHaveProperty('battleSessionId');
        joinedCount++;
        checkCompletion();
      }
    });
  });

  it('debe permitir que dos clientes propongan equipos y reciban TEAM_PROPOSED', (done) => {
    clientSocket1 = new WebSocket('ws://localhost:3002');
    clientSocket2 = new WebSocket('ws://localhost:3002');

    let teamProposedCount = 0;
    let battleSessionId: string;

    function checkCompletion() {
      if (teamProposedCount === 2) {
        done();
      }
    }

    clientSocket1.on('open', () => {
      const message = {
        event: 'FINDING',
        data: {
          userId: 'user1',
          userMemeIds: ['meme1', 'meme2'],
        },
      };
      clientSocket1.send(JSON.stringify(message));
    });

    clientSocket1.on('message', (data) => {
      const message = JSON.parse(data.toString());
      if (message.event === 'JOINED') {
        battleSessionId = message.data.battleSessionId;

        const proposeTeamMessage = {
          event: 'PROPOSE_TEAM',
          data: {
            battleSessionId,
            userId: 'user1',
            team: ['meme1', 'meme2'],
          },
        };
        clientSocket1.send(JSON.stringify(proposeTeamMessage));
      } else if (message.event === 'TEAM_PROPOSED') {
        expect(message.data).toHaveProperty('teams');
        teamProposedCount++;
        checkCompletion();
      }
    });

    clientSocket2.on('open', () => {
      const message = {
        event: 'FINDING',
        data: {
          userId: 'user2',
          userMemeIds: ['meme3', 'meme4'],
        },
      };
      clientSocket2.send(JSON.stringify(message));
    });

    clientSocket2.on('message', (data) => {
      const message = JSON.parse(data.toString());
      if (message.event === 'JOINED') {
        const proposeTeamMessage = {
          event: 'PROPOSE_TEAM',
          data: {
            battleSessionId: message.data.battleSessionId,
            userId: 'user2',
            team: [
              { userMemeId: 'meme3', position: 1 },
              { userMemeId: 'meme2', position: 2 },
            ],
          },
        };
        clientSocket2.send(JSON.stringify(proposeTeamMessage));
      } else if (message.event === 'TEAM_PROPOSED') {
        expect(message.data).toHaveProperty('teams');
        teamProposedCount++;
        checkCompletion();
      }
    });
  });
});
