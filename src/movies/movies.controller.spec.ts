import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiKeyGuard } from './guards/api-key.guard';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  //TODO: Fix tests
  it('is true', () => {
    expect(true).toBeTruthy;
  });
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        { provide: ConfigService, useValue: {} },
        { provide: MoviesService, useValue: {} },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
