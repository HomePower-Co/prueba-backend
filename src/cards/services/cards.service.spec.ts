import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Card } from '../parameters/cards.entity';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(Card),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});