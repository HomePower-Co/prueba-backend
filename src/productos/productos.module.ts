import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosEntity } from './productos.entity';
import { ProductosController } from './productos.controller';

@Module({
  providers: [ProductosService],
  imports: [TypeOrmModule.forFeature([ProductosEntity])],
  controllers: [ProductosController],
})
export class ProductosModule {}
