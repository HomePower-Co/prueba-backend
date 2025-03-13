import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class ProductosDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsNumber({}, { message: 'El precio debe ser numérico' })
  @IsNotEmpty()
  readonly precio: number;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @IsNotEmpty()
  readonly stock: number;
}
