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

  it('debe permitir que dos clientes propongan habilidades y resuelvan ataques', (done) => {
    clientSocket1 = new WebSocket('ws://localhost:3002');
    clientSocket2 = new WebSocket('ws://localhost:3002');

    let resolvedSkillsCount = 0;
    let battleSessionId: string;

    function checkCompletion() {
      if (resolvedSkillsCount === 2) {
        clientSocket1.close();
        clientSocket2.close();
        done();
      }
    }

    clientSocket1.on('open', () => {
      const message = {
        event: 'FINDING',
        data: {
          userId: 'user1',
          userMemeIds: ['userMemeId1', 'userMemeId2'],
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
            team: [
              { userMemeId: 'userMemeId1', position: 1 },
              { userMemeId: 'userMemeId2', position: 2 },
            ],
          },
        };
        clientSocket1.send(JSON.stringify(proposeTeamMessage));
      } else if (message.event === 'TEAM_PROPOSED') {
        const proposeSkillMessage = {
          event: 'PROPOSE_SKILL',
          data: {
            battleSessionId,
            userId: 'user1',
            memeId: 'userMemeId1',
            skillId: 'skill1',
          },
        };
        clientSocket1.send(JSON.stringify(proposeSkillMessage));
      } else if (message.event === 'RESOLVED_SKILLS') {
        expect(message.data).toHaveProperty('ownMemeHp');
        expect(message.data).toHaveProperty('opponentMemeHp');
        resolvedSkillsCount++;
        checkCompletion();
      }
    });

    clientSocket2.on('open', () => {
      const message = {
        event: 'FINDING',
        data: {
          userId: 'user2',
          userMemeIds: ['userMemeId3', 'userMemeId4'],
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
              { userMemeId: 'userMemeId3', position: 1 },
              { userMemeId: 'userMemeId4', position: 2 },
            ],
          },
        };
        clientSocket2.send(JSON.stringify(proposeTeamMessage));
      } else if (message.event === 'TEAM_PROPOSED') {
        const proposeSkillMessage = {
          event: 'PROPOSE_SKILL',
          data: {
            battleSessionId: message.data.battleSessionId,
            userId: 'user2',
            memeId: 'userMemeId3',
            skillId: 'skill2',
          },
        };
        clientSocket2.send(JSON.stringify(proposeSkillMessage));
      } else if (message.event === 'RESOLVED_SKILLS') {
        expect(message.data).toHaveProperty('ownMemeHp');
        expect(message.data).toHaveProperty('opponentMemeHp');
        resolvedSkillsCount++;
        checkCompletion();
      }
    });

    clientSocket1.on('error', (error) => {
      console.error('Error en clientSocket1:', error);
      done(error);
    });
    clientSocket2.on('error', (error) => {
      console.error('Error en clientSocket2:', error);
      done(error);
    });
  });
});
