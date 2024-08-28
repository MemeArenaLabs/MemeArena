import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { BattleService } from './battle.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { UpdateBattleDto } from './dto/update-battle.dto';

@WebSocketGateway()
export class BattleGateway {
  constructor(private readonly battleService: BattleService) {}

  @SubscribeMessage('createBattle')
  create(@MessageBody() createBattleDto: CreateBattleDto) {
    return this.battleService.create(createBattleDto);
  }

  @SubscribeMessage('findAllBattle')
  findAll() {
    return this.battleService.findAll();
  }

  @SubscribeMessage('findOneBattle')
  findOne(@MessageBody() id: number) {
    return this.battleService.findOne(id);
  }

  @SubscribeMessage('updateBattle')
  update(@MessageBody() updateBattleDto: UpdateBattleDto) {
    return this.battleService.update(updateBattleDto.id, updateBattleDto);
  }

  @SubscribeMessage('removeBattle')
  remove(@MessageBody() id: number) {
    return this.battleService.remove(id);
  }
}
