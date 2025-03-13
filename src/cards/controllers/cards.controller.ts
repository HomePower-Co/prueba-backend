import { Controller, Get, Post, Put, Patch, Delete, Body, Param  } from '@nestjs/common';
import { CardsService } from '../services/cards.service';
import { CreateCardsDto, UpdateCardsDto } from '../parameters/cards.dto';

import { ApiTags } from "@nestjs/swagger";

@ApiTags("cards")
@Controller({
  path: "cards",
  version: "1"
})

export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardsDto: CreateCardsDto) {
    return this.cardsService.create(createCardsDto);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCardsDto: UpdateCardsDto) {
    return this.cardsService.update(id, updateCardsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardsDto: UpdateCardsDto) {
    return this.cardsService.update(id, updateCardsDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cardsService.delete(id);
  }
}