import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpFetchService } from 'src/common/http-fetch/http-fetch.service';
import { Movie } from 'src/movies/entities/movie.entity';
import { MovieBusinessModel } from 'src/movies/models/movie.businessmodel';
import createDataStore, { MemoryDataStore } from 'src/movies/utils/dataStore';

@Injectable()
export class DataStoreService {
  constructor(
    private readonly httpFetch: HttpFetchService,
    private readonly configService: ConfigService,
  ) {
    this.CreateMovieCache();
  }

  private DataStore: MemoryDataStore;

  public async GetAllMovie(): Promise<MovieBusinessModel[]> {
    const store = await this.AccessDataStore();
    const movies = store.getAllMovies();

    return movies;
  }

  public async GetAllNoneGuessedMovied() {
    const store = await this.AccessDataStore();
    const movies = store.getNoneGuessedMovies();

    return movies;
  }

  public async GetMovieByImdbId(id: string) {
    const store = await this.AccessDataStore();
    const movie = store.getMovieByImdbId(id);

    return movie;
  }

  private async AccessDataStore(): Promise<MemoryDataStore> {
    if (this.DataStore) {
      return this.DataStore;
    }
    return this.CreateMovieCache();
  }

  private async GetMoviesFromServer(): Promise<Movie[]> {
    const endpoint = this.configService.get<string>('SHEET_BEST_URL');
    const data = await this.httpFetch.getHttp<Movie[]>(endpoint);

    return data;
  }

  private async CreateMovieCache() {
    const movies = await this.GetMoviesFromServer();
    this.DataStore = createDataStore(movies);

    return this.DataStore;
  }
}
