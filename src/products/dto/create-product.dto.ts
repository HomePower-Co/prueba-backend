import { Type } from "class-transformer";
import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @Min(0)
    @Type(() => Number)
    price: number;

    @IsNumber()
    stock: number;
}
