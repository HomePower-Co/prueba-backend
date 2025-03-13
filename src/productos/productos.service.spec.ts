import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { Repository } from 'typeorm';
import { ProductosEntity } from './productos.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { faker } from '@faker-js/faker';

describe('ProductosService', () => {
  let service: ProductosService;
  let repository: Repository<ProductosEntity>;
  let productosList: ProductosEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductosService],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
    repository = module.get<Repository<ProductosEntity>>(
      getRepositoryToken(ProductosEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    productosList = [];
    for (let i = 0; i < 5; i++) {
      const producto: ProductosEntity = await repository.save({
        nombre: faker.company.name(),
        precio: parseFloat(faker.finance.amount()),
        stock: faker.number.int(),
      });
      productosList.push(producto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all products', async () => {
    const products: ProductosEntity[] = await service.findAll();
    expect(products).not.toBeNull();
    expect(products.length).toBe(5);
  });

  it('findOne should return an product by id', async () => {
    const storedProduct: ProductosEntity = productosList[0];
    const product: ProductosEntity = await service.findOne(storedProduct.id);
    expect(product).not.toBeNull();
    expect(product.nombre).toEqual(storedProduct.nombre);
    expect(product.stock).toEqual(storedProduct.stock);
  });

  it('findOne should throw an exception for an invalid product', async () => {
    await expect(service.findOne('0')).rejects.toMatchObject(
      new BusinessLogicException(
        'The product with the given ID was not found.',
        BusinessError.NOT_FOUND,
      ),
    );
  });

  it('create shoud successfully create a new product', async () => {
    const product: ProductosEntity = {
      id: '',
      nombre: faker.company.name(),
      precio: parseFloat(faker.finance.amount()),
      stock: faker.number.int(),
    };

    const newProduct: ProductosEntity = await service.create(product);
    expect(newProduct).not.toBeNull();

    const storedProduct = await repository.findOne({
      where: { id: newProduct.id },
    });

    expect(storedProduct).not.toBeNull();
    expect(storedProduct?.nombre).toEqual(product.nombre);
  });

  it('update should modify an existing product', async () => {
    const product: ProductosEntity = productosList[0];
    product.nombre = 'Updated Name';

    const updatedProduct: ProductosEntity = await service.update(
      product.id,
      product,
    );
    expect(updatedProduct).not.toBeNull();

    const storedProduct = await repository.findOne({
      where: { id: product.id },
    });

    expect(storedProduct?.nombre).toEqual('Updated Name');
  });

  it('update should should throw an exception for an invalid product', async () => {
    const product: ProductosEntity = {
      id: '0',
      nombre: faker.company.name(),
      precio: parseFloat(faker.finance.amount()),
      stock: faker.number.int(),
    };

    await expect(() => service.update('0', product)).rejects.toMatchObject(
      new BusinessLogicException(
        'The product with the given ID was not found.',
        BusinessError.NOT_FOUND,
      ),
    );
  });

  it('delete should remove a product', async () => {
    const product = productosList[0];
    await service.delete(product.id);

    const deletedProduct = await repository.findOne({
      where: { id: product.id },
    });
    expect(deletedProduct).toBeNull();
  });

  it('delete should throw an exception for an invalid airline', async () => {
    await expect(() => service.delete('0')).rejects.toMatchObject(
      new BusinessLogicException(
        'The product with the given ID was not found.',
        BusinessError.NOT_FOUND,
      ),
    );
  });
});
