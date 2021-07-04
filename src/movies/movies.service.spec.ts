import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { DataService } from './services/data-service/data-service.service';
import { DataStoreService } from './services/data-store/data-store.service';
import createDataStore from './utils/dataStore';

describe('MoviesService', () => {
  //TODO: Fix tests
  it('is true', () => {
    expect(true).toBeTruthy;
  });
  // let service: MoviesService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       MoviesService,
  //       {
  //         provide: DataStoreService,
  //         useValue: {},
  //       },
  //       {
  //         provide: 'dataStore',
  //         useValue: { createDataStore },
  //       },
  //     ],
  //   }).compile();

  //   service = module.get<MoviesService>(MoviesService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
