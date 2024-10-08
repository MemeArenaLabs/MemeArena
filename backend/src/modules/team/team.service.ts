// src/modules/teams/teams.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserMeme } from '../meme/meme.entity';
import { CreateTeamDto } from './dto/team.dto';
import { Team } from './team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const { name, userId, userMemeIds } = createTeamDto;
  
    // Crear el equipo directamente con los IDs
    const team = this.teamRepository.create({
      name,
      user: { id: userId } as User, // Asociamos el ID del usuario al equipo
      userMemes: userMemeIds.map((id) => ({ id } as UserMeme)), // Asociamos los IDs de UserMemes
    });
  
    // Guardar el equipo
    await this.teamRepository.save(team);
  
    return team;
  }

  async listTeamsByUser(userId: string): Promise<Team[]> {
    return this.teamRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'userMemes', 'userMemes.meme'],
    });
  }

  async getTeamById(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['user', 'userMemes', 'userMemes.meme'],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID '${id}' not found`);
    }

    return team;
  }
}
