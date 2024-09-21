import {
  Controller,
} from '@nestjs/common';
import { MemeService } from './meme.service';

@Controller('meme')
export class MemeController {
  constructor(private readonly memeService: MemeService) {}

  // @Get()
  // findAll() {
  //   return this.memeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.memeService.findOne(+id);
  // }

  // @Post()
  // create(@Body() createMemeDto: CreateMemeDto) {
  //   return this.memeService.create(createMemeDto);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemeDto: UpdateMemeDto) {
  //   return this.memeService.update(+id, updateMemeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.memeService.remove(+id);
  // }
}
