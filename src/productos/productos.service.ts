import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductosEntity } from './productos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { unknownMsg } from '../shared/utils/validation.utils';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(ProductosEntity)
    private productosRepository: Repository<ProductosEntity>,
  ) {}

  async findAll(): Promise<ProductosEntity[]> {
    return await this.productosRepository.find();
  }

  async findOne(id: string): Promise<ProductosEntity> {
    const producto: ProductosEntity | null =
      await this.productosRepository.findOne({
        where: { id },
      });

    if (!producto) {
      throw new BusinessLogicException(
        unknownMsg('product'),
        BusinessError.NOT_FOUND,
      );
    }

    return producto;
  }

  async create(producto: ProductosEntity): Promise<ProductosEntity> {
    return await this.productosRepository.save(producto);
  }

  async update(
    id: string,
    producto: ProductosEntity,
  ): Promise<ProductosEntity> {
    const existingProduct = await this.productosRepository.findOne({
      where: { id },
    });

    if (!existingProduct) {
      throw new BusinessLogicException(
        unknownMsg('product'),
        BusinessError.NOT_FOUND,
      );
    }

    return await this.productosRepository.save({
      ...existingProduct,
      ...producto,
    });
  }

  async delete(id: string) {
    const producto = await this.productosRepository.findOne({
      where: { id },
    });

    if (!producto) {
      throw new BusinessLogicException(
        unknownMsg('product'),
        BusinessError.NOT_FOUND,
      );
    }

    await this.productosRepository.remove(producto);
  }
}
