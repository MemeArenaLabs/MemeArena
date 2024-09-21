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

describe('Propose Skill (e2e)', () => {
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
  let skillAId: string;
  let skillBId: string;

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

    const userMemeA1 = await dataSource.getRepository(UserMeme).findOne({
      where: { id: userMemeIdsA[0] },
      relations: ['meme', 'meme.skills'],
    });
    skillAId = userMemeA1.meme.skills[0].id;

    const userMemeB1 = await dataSource.getRepository(UserMeme).findOne({
      where: { id: userMemeIdsB[0] },
      relations: ['meme', 'meme.skills'],
    });
    skillBId = userMemeB1.meme.skills[0].id;

    await app.listen(3002);
  });

  afterAll(async () => {
    await app.close();
  });


  it('debe permitir que dos clientes propongan habilidades y reciban RESOLVED_SKILLS', (done) => {
    webocketClientA = new WebSocket('ws://localhost:3002');
    websocketClientB = new WebSocket('ws://localhost:3002');

    let resolvedSkillsCount = 0;
    let battleSessionId: string;

    function checkCompletion() {
      if (resolvedSkillsCount === 2) {
        webocketClientA.close();
        websocketClientB.close();
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
      console.log({ clientA: message });
      if (message.event === 'JOINED') {
        battleSessionId = message.data.battleSessionId;

        const proposeTeamMessage = {
          event: 'PROPOSE_TEAM',
          data: {
            battleSessionId,
            userId: userA.id,
            team: [
              { userMemeId: userMemeIdsA[0], position: 1 },
              { userMemeId: userMemeIdsA[1], position: 2 },
            ],
          },
        };
        webocketClientA.send(JSON.stringify(proposeTeamMessage));
      } else if (message.event === 'TEAM_PROPOSED') {
        const proposeSkillMessage = {
          event: 'PROPOSE_SKILL',
          data: {
            battleSessionId,
            userId: userA.id,
            userMemeId: userMemeIdsA[0],
            skillId: skillAId,
          },
        };
        webocketClientA.send(JSON.stringify(proposeSkillMessage));
      } else if (message.event === 'RESOLVED_SKILLS') {
        console.log({pa:message})
        expect(message.data).toHaveProperty('ownMemeHp');
        expect(message.data).toHaveProperty('opponentMemeHp');
        resolvedSkillsCount++;
        checkCompletion();
      }
    });

    websocketClientB.on('open', () => {
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
      console.log({ clientB: message });
      if (message.event === 'JOINED') {
        battleSessionId = message.data.battleSessionId;

        const proposeTeamMessage = {
          event: 'PROPOSE_TEAM',
          data: {
            battleSessionId,
            userId: userB.id,
            team: [
              { userMemeId: userMemeIdsB[0], position: 1 },
              { userMemeId: userMemeIdsB[1], position: 2 },
            ],
          },
        };
        websocketClientB.send(JSON.stringify(proposeTeamMessage));
      } else if (message.event === 'TEAM_PROPOSED') {
        const proposeSkillMessage = {
          event: 'PROPOSE_SKILL',
          data: {
            battleSessionId,
            userId: userB.id,
            userMemeId: userMemeIdsB[0],
            skillId: skillBId,
          },
        };
        websocketClientB.send(JSON.stringify(proposeSkillMessage));
      } else if (message.event === 'RESOLVED_SKILLS') {
        console.log({pb:message})
        expect(message.data).toHaveProperty('ownMemeHp');
        expect(message.data).toHaveProperty('opponentMemeHp');
        resolvedSkillsCount++;
        checkCompletion();
      }
    });

    webocketClientA.on('error', (error) => {
      console.error('Error en webocketClientA:', error);
      done(error);
    });

    websocketClientB.on('error', (error) => {
      console.error('Error en websocketClientB:', error);
      done(error);
    });
  });
});
