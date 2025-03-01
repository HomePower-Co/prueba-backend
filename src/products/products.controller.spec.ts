// import { Test, TestingModule } from '@nestjs/testing';
// import { ProductsController } from './products.controller';
// import { ProductsService } from './products.service';

// describe('ProductsController', () => {
//   let controller: ProductsController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ProductsController],
//       providers: [ProductsService],
//     }).compile();

//     controller = module.get<ProductsController>(ProductsController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call service.create with the correct DTO', async () => {
      const dto: CreateProductDto = { name: 'Test Product', price: 100.00, stock: 10 };
      mockProductsService.create.mockResolvedValue(dto);

      expect(await controller.create(dto)).toEqual(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [{ id: 'uuid-v4', name: 'Product' }];
      mockProductsService.findAll.mockResolvedValue(products);

      expect(await controller.findAll()).toEqual(products);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const product = { id: 'uuid-v4', name: 'Product' };
      mockProductsService.findOne.mockResolvedValue(product);

      expect(await controller.findOne('uuid-v4')).toEqual(product);
      expect(service.findOne).toHaveBeenCalledWith('uuid-v4');
    });
  });

  describe('update', () => {
    it('should call service.update with correct ID and DTO', async () => {
      const dto: UpdateProductDto = { name: 'Updated Product' };
      const updatedProduct = { id: 'uuid-v4', ...dto };
      mockProductsService.update.mockResolvedValue(updatedProduct);

      expect(await controller.update('uuid-v4', dto)).toEqual(updatedProduct);
      expect(service.update).toHaveBeenCalledWith('uuid-v4', dto);
    });
  });

  describe('remove', () => {
    it('should call service.remove with the correct ID', async () => {
      mockProductsService.remove.mockResolvedValue({ id: 'uuid-v4' });

      expect(await controller.remove('uuid-v4')).toEqual({ id: 'uuid-v4' });
      expect(service.remove).toHaveBeenCalledWith('uuid-v4');
    });
  });
});
