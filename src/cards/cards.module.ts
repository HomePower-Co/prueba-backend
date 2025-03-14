import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsController } from './controllers/cards.controller';
import { CardsService } from './services/cards.service';
import { Card } from './parameters/cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardsController],
  providers: [CardsService]
})
export class CardsModule {}
