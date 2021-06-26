import { Injectable } from '@nestjs/common';
import { MovieBusinessModel } from './models/movie.businessmodel';
import { DataStoreService } from './services/data-store/data-store.service';

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
}
