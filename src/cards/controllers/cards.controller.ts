import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateCardsDto, UpdateProductDto } from './product.dto';

@Controller('cards')
export class CardsController {}
