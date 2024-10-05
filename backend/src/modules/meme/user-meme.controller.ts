// src/modules/user-memes/user-memes.controller.ts

import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MemeService } from "./meme.service";
import { CreateUserMemeDto } from "./dto/meme.dto";
import { UserMeme } from "./meme.entity";
import { UserMemeDetails } from "./meme.types";


@Controller('user-memes')
export class UserMemesController {
  constructor(private readonly userMemesService: MemeService) {}

  @Post()
  async createUserMeme(@Body() createUserMemeDto: CreateUserMemeDto): Promise<UserMeme> {
    return this.userMemesService.createUserMeme(createUserMemeDto);
  }

  @Get('/users/:userId/memes')
  async findUserMemesByUserId(@Param('userId') userId: string): Promise<UserMemeDetails[]> {
    return this.userMemesService.findUserMemesByUserId(userId);
  }
}
