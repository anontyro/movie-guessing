import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from './data-store.service';

describe('DataStoreService', () => {
  let service: DataStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataStoreService],
    }).compile();

    service = module.get<DataStoreService>(DataStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
