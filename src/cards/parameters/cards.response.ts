import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  nombre!: number;

  @ApiProperty()
  precio!: number;

  @ApiProperty()
  stock!: number;
}