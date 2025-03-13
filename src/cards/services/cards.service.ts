import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../parameters/cards.entity';
import { CreateCardsDto, UpdateCardsDto } from '../parameters/cards.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardsDto) {
    const card = this.cardRepository.create(createCardDto);
    return await this.cardRepository.save(card);
  }

  async findAll() {
    return await this.cardRepository.find();
  }

  async update(id: string, updateCardDto: UpdateCardsDto) {
    await this.cardRepository.update(id, updateCardDto);
    return this.cardRepository.findOne({ where: { id } });
  }

  async delete(id: string) {
    const result = await this.cardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Tarjeta no encontrada');
    }
    return { message: 'Tarjeta eliminada' };
  }
}