import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpFetchService } from '../../../common/http-fetch/http-fetch.service';
import { DataService } from './data-service.service';

describe('DataServiceService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataService,
        {
          provide: ConfigService,
          useValue: {},
        },
        {
          provide: HttpFetchService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
