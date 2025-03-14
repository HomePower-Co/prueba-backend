import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateCardsDto {
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  precio!: number;

  @IsNumber()
  stock!: number;
}

export class UpdateCardsDto extends CreateCardsDto {
  @IsUUID()
  id?: string;
}