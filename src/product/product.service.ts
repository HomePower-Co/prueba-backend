import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaClient } from "@prisma/client";
import { PaginationDto } from "./dto/pagination.dto";

@Injectable()
export class ProductService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger();

  async onModuleInit() {
    await this.$connect();
    this.logger.debug(`Products db connected`);
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const queryResult = await this.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    if (queryResult.length == 0) {
      throw new NotFoundException(`Products not found`);
    }

    return queryResult;
  }

  async findOne(id: string) {
    const product = await this.product.findFirst({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    return this.product.update({ where: { id }, data: updateProductDto });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.product.delete({ where: { id } });
  }
}
