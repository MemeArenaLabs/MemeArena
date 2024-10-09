import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meme, Skill, UserMeme } from './meme.entity';
import { Repository } from 'typeorm';
import { BaseStats, MinMaxValues, TokenData } from '../token/token.type';
import { PROFESSIONS } from '../token/token.constants';
import { ELEMENTS } from '../battle/battle.constants';
import { UserMemeState } from '../battle/battle.type';
import { UserService } from '../user/user.service';
import { UserMemeDetails } from './meme.types';
import { CreateUserMemeDto } from './dto/meme.dto';
import { User } from '../user/user.entity';
import { title } from 'process';
@Injectable()
export class MemeService {
  constructor(
    @InjectRepository(Meme)
    private readonly memeRepository: Repository<Meme>,
    @InjectRepository(UserMeme)
    private readonly userMemeRepository: Repository<UserMeme>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async getMemeByUserMemeId(userMemeId: string): Promise<Meme> {
    const userMeme: UserMeme = await this.userMemeRepository.findOne({
      where: { id: userMemeId },
    });
    return userMeme.meme;
  }

  async getUserMemeDetails(userMemeId: string): Promise<UserMeme> {
    const userMeme = await this.userMemeRepository.findOne({
      where: { id: userMemeId },
      relations: ['meme'],
    });

    if (!userMeme) {
      throw new Error(`UserMeme no encontrado: ${userMemeId}`);
    }

    return userMeme;
  }

  async calculateMemeAttributes(
    userMeme: UserMeme,
    tokenDataMap: Map<string, TokenData>,
    minMaxValues: MinMaxValues,
  ): Promise<UserMemeState> {
    const baseStats = await this.getMemeBaseStats(userMeme.meme.id);
    const tokenData = tokenDataMap.get(userMeme.meme.token.id);
    const levelToken = this.calculateLevelToken(userMeme.tokensLocked);
    const hp = this.calculateAttribute(
      baseStats.hpBase,
      tokenData.marketCap,
      minMaxValues.minMarketCap,
      minMaxValues.maxMarketCap,
      0.5,
    );

    const attack = this.calculateAttribute(
      baseStats.attackBase,
      tokenData.volume24h/tokenData.marketCap,
      minMaxValues.minVolume24h,
      minMaxValues.maxVolume24h,
      1,
    );

    const defense = this.calculateAttribute(
      baseStats.defenseBase,
      tokenData.liquidity/tokenData.marketCap,
      minMaxValues.minLiquidity,
      minMaxValues.maxLiquidity,
      1,
    );

    const criticChance = tokenData.dailyChange > 0 ? 0.1 + tokenData.dailyChange / 2: 0;
    const speed = tokenData.trade24h;

    return {
      userMemeId: userMeme.id,
      hp,
      currentHp: hp,
      attack,
      defense,
      criticChance,
      speed,
      marketCap: tokenData.marketCap,
      volume24h: tokenData.volume24h,
      liquidity: tokenData.liquidity,
      level: levelToken,
      element: baseStats.element,
      profession: baseStats.profession,
    };
  }

  private calculateAttribute(
    baseValue: number,
    tokenValue: number,
    minValue: number,
    maxValue: number,
    multiplier: number,
  ): number {
    const normalizedValue = (tokenValue - minValue) / (maxValue - minValue);
    return baseValue + normalizedValue * baseValue * multiplier;
  }

  private async getMemeBaseStats(memeId: string): Promise<BaseStats> {
    const meme = await this.memeRepository.findOne({ where: { id: memeId } });
    if (!meme) {
      throw new Error(
        `No se encontraron datos base para el meme con id: ${memeId}`,
      );
    }

    let { hpBase, attackBase, defenseBase, speedBase } = meme;

    switch (meme.profession) {
      case PROFESSIONS.ROGUE:
        attackBase *= 1.1;
        speedBase *= 1.2;
        break;
      case PROFESSIONS.TANK:
        hpBase *= 1.3;
        defenseBase *= 1.2;
        break;
      case PROFESSIONS.FIGHTER:
        attackBase *= 1.15;
        hpBase *= 1.1;
        break;
    }

    return {
      hpBase,
      attackBase,
      defenseBase,
      speedBase,
      element: meme.element as ELEMENTS,
      profession: meme.profession as PROFESSIONS,
    };
  }

  async getMemeById(memeId: string): Promise<Meme> {
    const meme = await this.memeRepository.findOne({ where: { id: memeId } });
    if (!meme) {
      throw new Error(`Meme no encontrado con id: ${memeId}`);
    }
    return meme;
  }

  async calculateMinMaxValues(
    tokenDataMap: Map<string, TokenData>,
  ): Promise<MinMaxValues> {
    const marketCaps = Array.from(tokenDataMap.values()).map(
      (data) => data.marketCap,
    );
    const volume24hs = Array.from(tokenDataMap.values()).map(
      (data) => data.volume24h,
    );
    const liquidities = Array.from(tokenDataMap.values()).map(
      (data) => data.liquidity,
    );

    return {
      minMarketCap: Math.min(...marketCaps),
      maxMarketCap: Math.max(...marketCaps),
      minVolume24h: Math.min(...volume24hs),
      maxVolume24h: Math.max(...volume24hs),
      minLiquidity: Math.min(...liquidities),
      maxLiquidity: Math.max(...liquidities),
    };
  }

  private calculateLevelToken(tokensLocked: number): number {
    const TOKENS_PER_LEVEL = 1000;
    return Math.floor(tokensLocked / TOKENS_PER_LEVEL);
  }

  getSkill(skillId: string): Promise<Skill> {
    return this.skillRepository.findOne({ where: { id: skillId } });
  }

  async findUserMemesByUserId(userId: string): Promise<UserMemeDetails[]> {
    const userMemes = await this.userMemeRepository.find({
      where: { user: { id: userId } },
      relations: ['meme', 'meme.token', 'meme.skills'],
    });

    return userMemes.map((userMeme) => ({
      userMemeId: userMeme.id,
      tokensLocked: userMeme.tokensLocked,
      memeId: userMeme.meme.id,
      name: userMeme.meme.name,
      hpBase: userMeme.meme.hpBase,
      attackBase: userMeme.meme.attackBase,
      defenseBase: userMeme.meme.defenseBase,
      speedBase: userMeme.meme.speedBase,
      element: userMeme.meme.element,
      profession: userMeme.meme.profession,
      token: {
        id: userMeme.meme.token.id,
        symbol: userMeme.meme.token.symbol,
        name: userMeme.meme.token.name,
        totalSupply: userMeme.meme.token.totalSupply,
        contractAddress: userMeme.meme.token.contractAddress,
      },
      skills: userMeme.meme.skills.map((skill) => ({
        skillId: skill.id,
        name: skill.name,
        title: skill.title,
        quote: skill.quote,
        description: skill.description,
        damage: skill.damage,
        speed: skill.speed,
        type: skill.skillType,
      })),
    }));
  }

  async createUserMeme(createUserMemeDto: CreateUserMemeDto): Promise<UserMeme> {
    const { userId, name, element, profession, tokensLocked = 0 } = createUserMemeDto;

    const meme = await this.memeRepository.findOne({ where: { name, element: element.toUpperCase(), profession: profession.toUpperCase() } });
    if (!meme) {
      throw new BadRequestException(`Meme with name '${name}' element '${element}' and profession '${profession}' not found`);
    }

    const userMeme = this.userMemeRepository.create({
      user: {id: userId} as User,
      meme,
      tokensLocked,
    });
    console.log('User meme created', userMeme)
    return this.userMemeRepository.save(userMeme);
  }
}
