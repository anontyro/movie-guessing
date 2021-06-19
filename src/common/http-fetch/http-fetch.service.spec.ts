import { Test, TestingModule } from '@nestjs/testing';
import { HttpFetchService } from './http-fetch.service';

describe('HttpFetchService', () => {
  let service: HttpFetchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpFetchService],
    }).compile();

    service = module.get<HttpFetchService>(HttpFetchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
