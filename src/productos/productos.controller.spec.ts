import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';  
import { PrismaService } from '../../prisma/prisma.service'; 

describe('ProductosController', () => {
  let productosController: ProductosController;
  let productosService: ProductosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [
        ProductosService,  // Proveemos ProductosService
        PrismaService,     // Si Prisma es necesario en el servicio, agrégalo también
      ],
    }).compile();

    productosController = module.get<ProductosController>(ProductosController);
    productosService = module.get<ProductosService>(ProductosService);
  });

  it('should be defined', () => {
    expect(productosController).toBeDefined();
    expect(productosService).toBeDefined();
  });

});
