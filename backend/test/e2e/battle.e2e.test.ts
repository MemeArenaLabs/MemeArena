// test/battle.e2e-spec.ts

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as WebSocket from 'ws';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleModule } from '../../src/modules/battle/battle.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { TokenModule } from '../../src/modules/token/token.module';
import { seedDatabase } from '../../src/seeds/seeder';
import { typeOrmTestConfig } from '../../src/config/ormconfig.test';
import { DataSource } from 'typeorm';
import { User } from '../../src/modules/user/user.entity';
import { UserMeme } from '../../src/modules/meme/meme.entity';

describe('BattleGateway (e2e)', () => {
  let app: INestApplication;
  let webocketClientA: WebSocket;
  let websocketClientB: WebSocket;
  let dataSource: DataSource;
  let userA: User;
  let userMemesA: UserMeme[];
  let userMemeIdsA: string[];
  let userB: User;
  let userMemesB: UserMeme[];
  let userMemeIdsB: string[];
  

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmTestConfig),
        BattleModule,
        TokenModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useWebSocketAdapter(new WsAdapter(app));
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
    await seedDatabase(dataSource);

    userA = await dataSource.getRepository(User).findOneBy({ username: 'fran' });
    userMemesA = await dataSource.getRepository(UserMeme).find({ where: { user: userA } });
    userMemeIdsA = userMemesA.map((um) => um.id);

    userB = await dataSource.getRepository(User).findOneBy({ username: 'nahue' });
    userMemesB = await dataSource.getRepository(UserMeme).find({ where: { user: userB } });
    userMemeIdsB = userMemesB.map((um) => um.id);

    await app.listen(3002);
  });

  afterAll(async () => {
    await app.close();
  });

  it('debe permitir que dos clientes encuentren oponentes y reciban mensajes correctos', (done) => {
    webocketClientA = new WebSocket('ws://localhost:3002');
    websocketClientB = new WebSocket('ws://localhost:3002');
    webocketClientA.on('error', (error) => {
      console.error('Error en clientSocket1:', error);
    });

    websocketClientB.on('error', (error) => {
      console.error('Error en clientSocket2:', error);
    });

    let findingOkCount = 0;
    let joinedCount = 0;

    function checkCompletion() {
      console.log({ findingOkCount, joinedCount });
      if (findingOkCount === 2 && joinedCount === 2) {
        done();
        console.log('FIN TEST 1')
      }
    }

    webocketClientA.on('open', async () => {
      const message = {
        event: 'FINDING',
        data: {
          userId: userA.id,
          userMemeIds: userMemeIdsA,
        },
      };
      webocketClientA.send(JSON.stringify(message));
    });

    webocketClientA.on('message', (data) => {
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

    websocketClientB.on('open', async () => {
      const message = {
        event: 'FINDING',
        data: {
          userId: userB.id,
          userMemeIds: userMemeIdsB,
        },
      };
      websocketClientB.send(JSON.stringify(message));
    });

    websocketClientB.on('message', (data) => {
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
    console.log('arrranca el 2')
    webocketClientA = new WebSocket('ws://localhost:3002');
    websocketClientB = new WebSocket('ws://localhost:3002');

    let teamProposedCount = 0;
    let battleSessionId: string;

    function checkCompletion() {
      if (teamProposedCount === 2) {
        done();
      }
    }

    webocketClientA.on('open', () => {
      const message = {
        event: 'FINDING',
        data: {
          userId: userA.id,
          userMemeIds: userMemeIdsA,
        },
      };
      webocketClientA.send(JSON.stringify(message));
    });

    webocketClientA.on('message', (data) => {
      const message = JSON.parse(data.toString());
      console.log({pa:message})
      if (message.event === 'JOINED') {
        battleSessionId = message.data.battleSessionId;

        const proposeTeamMessage = {
          event: 'PROPOSE_TEAM',
          data: {
            battleSessionId,
            userId: userA.id,
            team: [
              { userMemeId: userMemeIdsA[0], position: 1 },
              { userMemeId: userMemeIdsA[0], position: 2 },
            ],
          },
        };
        webocketClientA.send(JSON.stringify(proposeTeamMessage));
      } else if (message.event === 'TEAM_PROPOSED') {
        expect(message.data).toHaveProperty('teams');
        teamProposedCount++;
        checkCompletion();
      }
    });

    websocketClientB.on('open', async () => {
      const userB = await dataSource.getRepository(User).findOneBy({ username: 'nahue' });
      const userMemesB = await dataSource.getRepository(UserMeme).find({ where: { user: userB } });
      const userMemeIdsB = userMemesB.map((um) => um.id);
      const message = {
        event: 'FINDING',
        data: {
          userId: userB.id,
          userMemeIds: userMemeIdsB,
        },
      };
      websocketClientB.send(JSON.stringify(message));
    });

    websocketClientB.on('message', (data) => {
      const message = JSON.parse(data.toString());
      console.log({pb:message})
      if (message.event === 'JOINED') {
        const proposeTeamMessage = {
          event: 'PROPOSE_TEAM',
          data: {
            battleSessionId: message.data.battleSessionId,
            userId: userB.id,
            team: [
              { userMemeId: userMemeIdsB[0], position: 1 },
              { userMemeId: userMemeIdsB[0], position: 2 },
            ],
          },
        };
        websocketClientB.send(JSON.stringify(proposeTeamMessage));
      } else if (message.event === 'TEAM_PROPOSED') {
        expect(message.data).toHaveProperty('teams');
        teamProposedCount++;
        checkCompletion();
      }
    });
  })
})
