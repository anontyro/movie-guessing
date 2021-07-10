import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieMetaData } from 'src/movies/models/moveMetaData.model';
import { Movie } from '../../entities/movie.entity';
import { MovieBusinessModel } from '../../models/movie.businessmodel';
import createDataStore, { MemoryDataStore } from '../../utils/dataStore';
import { parseBusinessModelToEntity } from '../../utils/modelParsers';
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

  public async GetMoviesMetaData(): Promise<MovieMetaData> {
    const store = await this.AccessDataStore();
    return store.getMovieMetaData();
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

  private CleanMovie = (movie: Movie) => {
    for (const propName in movie) {
      if (
        movie[propName] === null ||
        movie[propName] === undefined ||
        movie[propName] === ''
      ) {
        delete movie[propName];
      }
    }
    return movie;
  };

  public async UpdateMovieByImdbId(
    id: string,
    movie: Partial<MovieBusinessModel>,
  ) {
    const store = await this.AccessDataStore();
    const exists = store.getMovieByImdbId(id);
    if (!exists) {
      throw new NotFoundException(
        `Entity: ${movie.name} with imdb: ${movie.imdbId} does not exist try adding it first`,
      );
    }

    const entity = parseBusinessModelToEntity(movie);
    const data = await this.dataService.UpdateMovieOnServer(
      this.CleanMovie(entity),
      id,
    );

    store.updateMovie(id, movie);
    return data;
  }

  public async AddMovie(movie: MovieBusinessModel) {
    const store = await this.AccessDataStore();
    const exists = store.getMovieByImdbId(movie.imdbId);
    if (exists) {
      return exists;
    }

    movie.id = store.getNextId();
    const entity = parseBusinessModelToEntity(movie);
    const data = await this.dataService.AddMovieOnServer(entity);

    store.addMovie(movie);
    return data;
  }

  private async AccessDataStore(): Promise<MemoryDataStore> {
    if (this.DataStore && !this.DataStore.isCacheExpired()) {
      return this.DataStore;
    }
    return this.CreateMovieCache();
  }

  public async CacheInfo() {
    const store = await this.AccessDataStore();
    const storeData = store.getStoreData();

    return {
      Expires: storeData.ttl,
      StoreChanges: storeData.mutationList,
      StoreQueries: storeData.queryList,
    };
  }

  public async CreateMovieCache() {
    const movies = await this.dataService.GetMoviesFromServer();
    this.DataStore = createDataStore(movies);

    return this.DataStore;
  }
}
