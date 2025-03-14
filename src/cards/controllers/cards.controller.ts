import { Controller, Get, Post, Put, Patch, Delete, Body, Param, NotFoundException  } from '@nestjs/common';
import { CardsService } from '../services/cards.service';
import { CreateCardsDto, UpdateCardsDto } from '../parameters/cards.dto';

import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ErrorBaseResponse } from '../common/exception/error.response';
import { BaseResponse } from '../parameters/cards.response';
import { Card } from '../parameters/cards.entity';

@ApiTags("cards")
@Controller({
  path: "cards",
  version: "1"
})

// Errors responses
@ApiUnauthorizedResponse({
  description: "Unauthorized",
  type: ErrorBaseResponse
})
@ApiForbiddenResponse({
  description: "Forbidden",
  type: ErrorBaseResponse
})
@ApiBadRequestResponse({
  description: "Bad Request",
  type: ErrorBaseResponse
})
@ApiInternalServerErrorResponse({
  description: "Internal Server Error",
  type: ErrorBaseResponse
})

export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({
    summary: "Crear tarjetas",
    description: "Crear tarjetas"
  })
  @ApiOkResponse({
    type: BaseResponse
  })
  @Post()
  async create(@Body() createCardsDto: CreateCardsDto): Promise<Card> {
    return this.cardsService.create(createCardsDto);
  }

  @ApiOperation({
    summary: "Obtener tarjetas por ID",
    description: "Obtener tarjetas por ID"
  })
  @ApiOkResponse({
    type: BaseResponse
  })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Card> {
    const card = await this.cardsService.findById(id);
    if (!card) {
      throw new NotFoundException('Card does not exist!');
    } else {
      return card;
    }
  }

  @ApiOperation({
    summary: "Obtener todas las tarjetas",
    description: "Obtener todas las tarjetas"
  })
  @ApiOkResponse({
    type: BaseResponse
  })
  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }
  
  @ApiOperation({
    summary: "Actualizar tarjetas por id",
    description: "Actualizar tarjetas por id"
  })
  @ApiOkResponse({
    type: BaseResponse
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCardsDto: UpdateCardsDto) {
    return this.cardsService.update(id, updateCardsDto);
  }

  @ApiOperation({
    summary: "Actualizar el nombre de las tarjetas por id",
    description: "Actualizar el nombre de las tarjetas por id"
  })
  @ApiOkResponse({
    type: BaseResponse
  })
  @Patch(':id')
  async updateParam(@Param('id') id: string, @Body() updateCardsDto: UpdateCardsDto) {
    return this.cardsService.update(id, updateCardsDto);
  }

  @ApiOperation({
    summary: "Eliminar tarjetas por id",
    description: "Eliminar tarjetas por id"
  })
  @ApiOkResponse({
    type: BaseResponse
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this.cardsService.findById(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.cardsService.delete(id);
  }
}