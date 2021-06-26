import { Injectable } from '@nestjs/common';
import { MovieBusinessModel } from 'src/movies/models/movie.businessmodel';
import createDataStore, { MemoryDataStore } from 'src/movies/utils/dataStore';
import { DataService } from '../data-service/data-service.service';

@Injectable()
export class DataStoreService {
  constructor(private readonly dataService: DataService) {
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

  private async CreateMovieCache() {
    const movies = await this.dataService.GetMoviesFromServer();
    this.DataStore = createDataStore(movies);

    return this.DataStore;
  }
}
