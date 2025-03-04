import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";

describe("ProductService", () => {
  let service: ProductService;
  let mockPrisma = {
    create: jest.fn().mockImplementation((dto) => {
      return {
        id: "1766941c-57dc-45a9-b79b-08835b9a755c",
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new product", async () => {
    const createProductDto: CreateProductDto = {
      name: "Test Product",
      price: 99.99,
      stock: 10,
    };

    expect(await service.create(createProductDto)).toEqual({
      id: expect.any(String),
      ...createProductDto,
    });
  });
});
