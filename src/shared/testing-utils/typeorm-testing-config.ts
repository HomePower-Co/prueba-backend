import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosEntity } from '../../productos/productos.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [ProductosEntity],
    dropSchema: true,
    synchronize: true,
  }),
  TypeOrmModule.forFeature([ProductosEntity]),
];
