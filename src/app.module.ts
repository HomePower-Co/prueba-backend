import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductosEntity } from './productos/productos.entity';

function databaseConfigFromEnv(): TypeOrmModuleOptions {
  if (!process.env.DATABASE_URL) {
    throw new Error('Environment variable DATABASE_URL is not defined');
  }

  const url = new URL(process.env.DATABASE_URL); // Problem 1
  const scheme = url.protocol.slice(0, -1);

  if (scheme == 'sqlite') {
    return {
      type: 'sqlite',
      database: url.pathname || url.host,
    };
  }

  if (scheme === 'postgres') {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
    };
  }

  throw new Error('Invalid database URL');
}

@Module({
  imports: [
    ProductosModule,
    // Carga .env automáticamente
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...databaseConfigFromEnv(),
      entities: [ProductosEntity],
      dropSchema: true,
      synchronize: true,
      //keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
