import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    products: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto = { name: 'Testing Product', price: 10000.0, stock: 5 };

    it('should create a product successfully', async () => {
      mockPrismaService.products.create.mockResolvedValue(dto);
      await expect(service.create(dto)).resolves.toEqual(dto);
      // expect(await service.create(dto)).toEqual(dto);
      expect(mockPrismaService.products.create).toHaveBeenCalledWith({ data: dto });
    });

    it('should throw InternalServerErrorException on failure', async () => {
      // Temporarily overriding console.error to don't print anything to the console.
      // This test simulates a database error, and it's shows a console.error 
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

      mockPrismaService.products.create.mockRejectedValue(new Error('DB error'));

      await expect(service.create(dto)).rejects.toThrow(InternalServerErrorException);

      // Restore the console.error print in the console.
      consoleSpy.mockRestore();
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {

      const products = [{ id: 'uuid-v4', name: 'Product', price: 10000.00, stock: 5 }]

      mockPrismaService.products.findMany.mockResolvedValue(products);
      await expect(service.findAll()).resolves.toEqual(products);
    });

    it('should throw InternalServerErrorException on failure', async () => {
      // Temporarily overriding console.error to don't print anything to the console.
      // This test simulates a database error, and it's shows a console.error 
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { }); 

      mockPrismaService.products.findMany.mockRejectedValue(new Error('DB error'));
      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
      
      // Restore the console.error print in the console.
      consoleSpy.mockRestore();
    });
  });

  describe('findOne', () => {
    const product = { id: 'uuid-v4', name: 'Product', price: 10000.00, stock: 5 };

    it('should return a product if found', async () => {
      mockPrismaService.products.findUnique.mockResolvedValue(product);
      await expect(service.findOne('uuid-v4')).resolves.toMatchObject(product);

    });

    it('should throw NotFoundException if product is not found', async () => {
      mockPrismaService.products.findUnique.mockResolvedValue(null);
      await expect(service.findOne('uuid-v44')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updatedProduct = { id: 'uuid-v4', name: 'Updated Product' };

    it('should update a product successfully', async () => {
      mockPrismaService.products.update.mockResolvedValue(updatedProduct);
      await expect(service.update('uuid-v4', { name: 'New Updated Product' })).resolves.toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockPrismaService.products.update.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('', { code: 'P2025', clientVersion: '4.0.0' }));
      await expect(service.update('uuid-v4', { name: 'Updated' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a product successfully', async () => {
      mockPrismaService.products.delete.mockResolvedValue({ id: 'uuid-v4' });
      await expect(service.remove('uuid-v4')).resolves.toEqual({ id: 'uuid-v4' });
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockPrismaService.products.delete.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('', { code: 'P2025', clientVersion: '4.0.0' }));
      await expect(service.remove('uuid-v4')).rejects.toThrow(NotFoundException);
    });
  });
});
