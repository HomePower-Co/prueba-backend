import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductosService', () => {
  let service: ProductosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosService, PrismaService],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('crear', () => {
    it('debería crear un nuevo producto', async () => {
      const createDto = { nombre: 'Producto 1', precio: 100.5, stock: 10 };
      const productoCreado = { id: 'some-uuid', ...createDto };
      
      jest.spyOn(prisma.producto, 'create').mockResolvedValue(productoCreado as any);

      const resultado = await service.create(createDto);
      expect(resultado).toEqual(productoCreado);
    });
  });

  describe('encontrar todos', () => {
    it('debería devolver un array de productos', async () => {
      const productos = [
        { id: 'uuid-1', nombre: 'Producto 1', precio: 100.5, stock: 10 },
        { id: 'uuid-2', nombre: 'Producto 2', precio: 200.0, stock: 20 },
      ];
      jest.spyOn(prisma.producto, 'findMany').mockResolvedValue(productos);

      const resultado = await service.findAll();
      expect(resultado).toEqual(productos);
    });
  });

  describe('encontrar uno', () => {
    it('debería devolver un producto si se encuentra', async () => {
      const producto = { id: 'uuid-1', nombre: 'Producto 1', precio: 100.5, stock: 10 };
      jest.spyOn(prisma.producto, 'findUnique').mockResolvedValue(producto);

      const resultado = await service.findOne('uuid-1');
      expect(resultado).toEqual(producto);
    });

    it('debería lanzar NotFoundException si el producto no se encuentra', async () => {
      jest.spyOn(prisma.producto, 'findUnique').mockResolvedValue(null);

      try {
        await service.findOne('id-no-existente');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Producto con id id-no-existente no encontrado');
      }
    });
  });

  describe('actualizar', () => {
    it('debería actualizar un producto existente', async () => {
      const productoExistente = { id: 'uuid-1', nombre: 'Producto 1', precio: 100.5, stock: 10 };
      const updateDto = { precio: 150.0 };
      const productoActualizado = { ...productoExistente, ...updateDto };

      jest.spyOn(prisma.producto, 'findUnique').mockResolvedValue(productoExistente as any);
      jest.spyOn(prisma.producto, 'update').mockResolvedValue(productoActualizado as any);

      const resultado = await service.update('uuid-1', updateDto);
      expect(resultado).toEqual(productoActualizado);
    });

    it('debería lanzar NotFoundException si el producto a actualizar no existe', async () => {
      jest.spyOn(prisma.producto, 'findUnique').mockResolvedValue(null);

      try {
        await service.update('id-no-existente', { precio: 150.0 });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Producto con id id-no-existente no encontrado');
      }
    });
  });

  describe('eliminar', () => {
    it('debería eliminar un producto existente', async () => {
      const productoAEliminar = { id: 'uuid-1', nombre: 'Producto 1', precio: 100.5, stock: 10 };
      jest.spyOn(prisma.producto, 'findUnique').mockResolvedValue(productoAEliminar as any);
      jest.spyOn(prisma.producto, 'delete').mockResolvedValue(productoAEliminar as any);

      const resultado = await service.remove('uuid-1');
      expect(resultado).toEqual(productoAEliminar);
    });

    it('debería lanzar NotFoundException si el producto a eliminar no existe', async () => {
      jest.spyOn(prisma.producto, 'findUnique').mockResolvedValue(null);

      try {
        await service.remove('id-no-existente');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Producto con id id-no-existente no encontrado');
      }
    });
  });
});
