import { Controller, UseInterceptors } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('productos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}
}
