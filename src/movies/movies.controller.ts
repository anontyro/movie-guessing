import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { MovieUpdateDto } from './dtos/movie-update.dto';
import { MovieDto } from './dtos/movie.dto';
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

  @Public()
  @Get('meta')
  getMoviesMetaData() {
    return this.moviesService.GetMoviesMetaData();
  }

  @Public()
  @Get('cache-info')
  getCacheInfo() {
    return this.moviesService.CacheInfo();
  }

  @Get('all')
  authRoute() {
    return this.moviesService.GetAllMovie();
  }

  @Get('validate')
  checkValidateToken() {
    return {
      message: 'valid access token',
    };
  }

  @Post('cache-clear')
  clearCache() {
    return this.moviesService.ClearCache();
  }

  @Post()
  addMovie(@Body() movieDto: MovieDto) {
    return this.moviesService.AddMovieByImdbId(movieDto);
  }

  @Patch()
  updateMovie(@Param('id') id: string, @Body() movieUpdate: MovieUpdateDto) {
    return this.moviesService.UpdateMovie(id, movieUpdate);
  }
}
