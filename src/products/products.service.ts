import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';

import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.products.create({
        data: createProductDto
      })

    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Error creating a new product');
    }
  }

  async findAll() {
    try {
      return await this.prisma.products.findMany()

    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Error fetching all products');
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.products.findUnique({
        where: { id }
      })

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`)
      }

      return product
    } catch (error) {

      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Product with id ${id} not found`)
      }

      console.error(error)
      throw new InternalServerErrorException(`Error fetching product with id ${id}`);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.products.update({
        where: { id },
        data: updateProductDto
      })

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      console.error(error)
      throw new InternalServerErrorException(`Error updating product with id ${id}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.products.delete({
        where: { id }
      })

    } catch (error) {

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      console.error(error)
      throw new InternalServerErrorException(`Error deleting product with id ${id}`);
    }
  }
}
