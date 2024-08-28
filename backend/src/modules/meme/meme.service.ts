import { Injectable } from '@nestjs/common';
import { CreateMemeDto } from './dto/create-meme.dto';
import { UpdateMemeDto } from './dto/update-meme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meme } from './meme.entity';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
@Injectable()
export class MemeService {
  constructor(
    @InjectRepository(Meme)
    private memeRepository: Repository<Meme>,
  ) {}
  
  async create(createMemeDto: CreateMemeDto): Promise<Meme> {
    const meme = this.memeRepository.create(createMemeDto);
    return await this.memeRepository.save(meme);
  }

  async getMemesByUser(userId: string): Promise<Meme[]> {
    return await this.memeRepository.find({
      where: { user: { id: userId } },
    });
  }

  findAll() {
    return `This action returns all meme`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meme`;
  }

  update(id: number, updateMemeDto: UpdateMemeDto) {
    return `This action updates a #${id} meme`;
  }

  remove(id: number) {
    return `This action removes a #${id} meme`;
  }
}
