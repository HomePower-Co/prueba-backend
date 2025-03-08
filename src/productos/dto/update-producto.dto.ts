import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';

export class UpdateProductoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  precio?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;
}
