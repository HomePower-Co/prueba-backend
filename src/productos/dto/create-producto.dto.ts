import { IsString, IsInt, IsPositive, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsInt()
  @IsPositive()
  stock: number;
}
