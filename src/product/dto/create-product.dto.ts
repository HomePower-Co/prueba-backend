import { Type } from "class-transformer";
import { IsDecimal, IsInt, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({
    example: "Camiseta de algodón",
    description: "Nombre del producto",
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 29.99,
    description: "Precio del producto en USD",
    required: true,
    type: Number,
    minimum: 0,
    maximum: 999999.99,
  })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    { message: "Max. two decimal places" }
  )
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({
    example: 100,
    description: "Cantidad de stock disponible",
    required: true,
    type: Number,
    minimum: 0,
  })
  @Min(0)
  @IsInt()
  @IsNumber()
  @Type(() => Number)
  stock: number;
}
