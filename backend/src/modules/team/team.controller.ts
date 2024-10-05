// src/modules/teams/teams.controller.ts

import { Controller, Post, Body, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTeamDto } from './dto/team.dto';
import { Team } from './team.entity';
import { TeamsService } from './team.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.createTeam(createTeamDto);
  }

  @Get('/users/:userId')
  async listTeamsByUser(@Param('userId') userId: string): Promise<Team[]> {
    return this.teamsService.listTeamsByUser(userId);
  }

  @Get('/:id')
  async getTeamById(@Param('id') id: string): Promise<Team> {
    return this.teamsService.getTeamById(id);
  }
}
