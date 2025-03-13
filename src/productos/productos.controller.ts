import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ProductosEntity } from './productos.entity';
import { ProductosDto } from './productos.dto';

@Controller('productos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async findAll() {
    return await this.productosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productosService.findOne(id);
  }

  @Post()
  async create(@Body() productosDto: ProductosDto) {
    const producto: ProductosEntity = plainToInstance(
      ProductosEntity,
      productosDto,
    );
    return await this.productosService.create(producto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() productosDto: ProductosDto) {
    const producto: ProductosEntity = plainToInstance(
      ProductosEntity,
      productosDto,
    );
    return await this.productosService.update(id, producto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.productosService.delete(id);
  }
}
