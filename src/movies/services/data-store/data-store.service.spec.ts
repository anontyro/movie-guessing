import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from '../data-service/data-service.service';
import { DataStoreService } from './data-store.service';

describe('DataStoreService', () => {
  let service: DataStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataStoreService,
        {
          provide: DataService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DataStoreService>(DataStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
