import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Prisma } from '@prisma/client'; 

@Injectable()
export class ProductosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      return await this.prisma.producto.create({
        data: {
          nombre: createProductoDto.nombre,
          precio: createProductoDto.precio,
          stock: createProductoDto.stock,
        },
      });
    } catch (error) {
      console.error('Error al crear el producto:', error);
      
      // Si el error es una violación de unicidad (por ejemplo, nombre duplicado)
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('El producto con ese nombre ya existe');
      }

      // Para otros errores, lanzamos una excepción general
      throw new InternalServerErrorException('Error al crear el producto', error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.producto.findMany();
    } catch (error) {
      console.error('Error al obtener todos los productos:', error);
      throw new InternalServerErrorException('Error al obtener los productos', error.message);
    }
  }

  async findOne(id: string) {
    const producto = await this.prisma.producto.findUnique({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const producto = await this.prisma.producto.findUnique({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    try {
      return await this.prisma.producto.update({
        where: { id },
        data: updateProductoDto,
      });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw new InternalServerErrorException('Error al actualizar el producto', error.message);
    }
  }

  async remove(id: string) {
    const producto = await this.prisma.producto.findUnique({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    try {
      return await this.prisma.producto.delete({ where: { id } });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw new InternalServerErrorException('Error al eliminar el producto', error.message);
    }
  }
}
