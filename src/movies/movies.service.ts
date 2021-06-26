import { Injectable } from '@nestjs/common';
import { MovieUpdateDto } from './dtos/movie-update.dto';
import { MovieDto } from './dtos/movie.dto';
import { MovieBusinessModel } from './models/movie.businessmodel';
import { DataStoreService } from './services/data-store/data-store.service';
import { parseDtoToBusinessModel } from './utils/modelParsers';

@Injectable()
export class MoviesService {
  constructor(private readonly dataStoreService: DataStoreService) {}

  public async GetAllMovie(): Promise<MovieBusinessModel[]> {
    const movies = await this.dataStoreService.GetAllMovie();

    return movies;
  }

  public async GetAllNoneGuessedMovied() {
    const movies = await this.dataStoreService.GetAllNoneGuessedMovied();

    return movies.filter((m) => m.name.length > 0);
  }

  public async GetMovieByImdbId(id: string) {
    const movie = await this.dataStoreService.GetMovieByImdbId(id);

    return movie;
  }

  public async AddMovieByImdbId(movie: MovieDto) {
    const nextMovie = parseDtoToBusinessModel(movie);

    const add = await this.dataStoreService.AddMovie(nextMovie);

    return add;
  }

  public async UpdateMovie(id: string, movie: MovieUpdateDto) {
    const updateMovie = parseDtoToBusinessModel(movie);

    const update = await this.dataStoreService.UpdateMovieByImdbId(id, movie);

    return update;
  }
}
