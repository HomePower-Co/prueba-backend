import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";

describe("ProductController", () => {
  let controller: ProductController;
  let mockProductService = {
    create: jest.fn((dto) => {
      return {
        id: "a2747e44-3d8c-4cc9-924b-fc94fe0380d8",
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a product", () => {
    const createSolicitudDto: CreateProductDto = {
      name: "Camisa de lana",
      price: 14.44,
      stock: 15,
    };

    expect(controller.create(createSolicitudDto)).toEqual({
      id: expect.any(String),
      ...createSolicitudDto,
    });
  });
});
