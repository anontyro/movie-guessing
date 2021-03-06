import { Injectable } from '@nestjs/common';
import { MovieUpdateDto } from './dtos/movie-update.dto';
import { MovieDto } from './dtos/movie.dto';
import { MovieMetaData } from './models/moveMetaData.model';
import { MovieOutputBusinessModel } from './models/movieoutput.businessmodel';
import { DataStoreService } from './services/data-store/data-store.service';
import {
  parseBusinessModelsToOutputBusinessModels,
  parseDtoToBusinessModel,
} from './utils/modelParsers';

@Injectable()
export class MoviesService {
  constructor(private readonly dataStoreService: DataStoreService) {}

  public async GetAllMovie(): Promise<MovieOutputBusinessModel[]> {
    const movies = await this.dataStoreService.GetAllMovie();
    const moviesOutput = parseBusinessModelsToOutputBusinessModels(movies);

    return moviesOutput;
  }

  public async GetMoviesMetaData(): Promise<MovieMetaData> {
    const metaData = await this.dataStoreService.GetMoviesMetaData();

    return metaData;
  }

  public async GetAllNoneGuessedMovied() {
    const movies = await this.dataStoreService.GetAllNoneGuessedMovied();
    movies.filter((m) => m.name.length > 0);
    const moviesOutput = parseBusinessModelsToOutputBusinessModels(movies);

    return moviesOutput;
  }

  public async GetMovieByImdbId(id: string) {
    const movie = await this.dataStoreService.GetMovieByImdbId(id);
    const moviesOutput = parseBusinessModelsToOutputBusinessModels([movie]);

    return moviesOutput[0];
  }

  public async AddMovieByImdbId(movie: MovieDto) {
    const nextMovie = parseDtoToBusinessModel(movie);

    const add = await this.dataStoreService.AddMovie(nextMovie);

    return add;
  }

  public async UpdateMovie(id: string, movie: MovieUpdateDto) {
    const update = await this.dataStoreService.UpdateMovieByImdbId(id, movie);

    return update;
  }

  public async CacheInfo() {
    const dataStore = await this.dataStoreService.CacheInfo();
    return dataStore;
  }

  public async ClearCache() {
    const dataStore = await this.dataStoreService.CreateMovieCache();
    const { ttl } = dataStore.getStoreData();
    return {
      nextExpiry: ttl,
      cacheCleared: true,
    };
  }
}
