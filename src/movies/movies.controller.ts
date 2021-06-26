import { Controller, Get, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiKeyGuard } from './guards/api-key.guard';
import { MoviesService } from './movies.service';

@Controller('movies')
@UseGuards(ApiKeyGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Public()
  @Get()
  getNoneGuessedMovies() {
    return this.moviesService.GetAllNoneGuessedMovied();
  }

  @Get('all')
  authRoute() {
    return this.moviesService.GetAllMovie();
  }
}
