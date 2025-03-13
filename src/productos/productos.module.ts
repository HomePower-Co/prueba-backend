import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosEntity } from './productos.entity';

@Module({
  providers: [ProductosService],
  imports: [TypeOrmModule.forFeature([ProductosEntity])],
})
export class ProductosModule {}
