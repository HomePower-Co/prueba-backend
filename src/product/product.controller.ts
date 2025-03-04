import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PaginationDto } from "./dto/pagination.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";

@ApiTags("Product") // Agrupa los endpoints en Swagger UI
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({
    summary: "Crear un nuevo producto",
    description: "Registra un nuevo producto en el sistema",
  })
  @ApiBody({ type: CreateProductDto }) // Documenta el cuerpo de la solicitud
  @ApiResponse({
    status: 201,
    description: "Producto creado exitosamente",
  })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: "Obtener todos los productos",
    description: "Obtiene una lista paginada de productos",
  })
  @ApiQuery({
    name: "page",
    type: Number,
    required: false,
    example: 1,
    description: "Número de página",
  })
  @ApiQuery({
    name: "limit",
    type: Number,
    required: false,
    example: 10,
    description: "Límite de resultados por página",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de productos obtenida exitosamente",
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Obtener un producto por ID",
    description:
      "Obtiene los detalles de un producto específico usando su UUID",
  })
  @ApiParam({
    name: "id",
    type: String,
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "UUID del producto",
  })
  @ApiResponse({ status: 200, description: "Producto encontrado" })
  @ApiResponse({ status: 404, description: "Producto no encontrado" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Actualizar un producto",
    description: "Actualiza parcialmente un producto existente",
  })
  @ApiParam({
    name: "id",
    type: String,
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: "Producto actualizado" })
  @ApiResponse({ status: 404, description: "Producto no encontrado" })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Eliminar un producto",
    description: "Elimina un producto del sistema usando su UUID",
  })
  @ApiParam({
    name: "id",
    type: String,
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @ApiResponse({ status: 200, description: "Producto eliminado" })
  @ApiResponse({ status: 404, description: "Producto no encontrado" })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
