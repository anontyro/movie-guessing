import { MovieUpdateDto } from '../dtos/movie-update.dto';
import { MovieDto } from '../dtos/movie.dto';
import { Movie } from '../entities/movie.entity';
import { MovieBusinessModel } from '../models/movie.businessmodel';
import * as dateFns from 'date-fns';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  parseEntitiesToBusinessModels,
  parseDtoToBusinessModel,
} from './modelParsers';

interface DataStore {
  movies: MovieBusinessModel[];
  meta: {
    ttl: Date;
    queryList: [];
    mutationList: [];
  };
}

export interface MemoryDataStore {
  getDataStore: () => DataStore;
  resetData: (data?: Movie[]) => void;
  getNextId: () => number;
  getAllMovies: () => MovieBusinessModel[];
  getNoneGuessedMovies: (count?: number) => MovieBusinessModel[];
  getMovieByImdbId: (id: string) => MovieBusinessModel;
  addMovie: (movie: MovieDto) => MovieBusinessModel;
  addMovieByImdbId: (id: string) => MovieBusinessModel;
  updateMovie: (movie: MovieUpdateDto) => MovieBusinessModel;
  getListMetaData: () => unknown;
  isCacheExpired: () => boolean;
}

const getNoneGuessedMovied = (
  movies: MovieBusinessModel[],
  count?: number,
): MovieBusinessModel[] => {
  const filterNoneGuessed = movies.filter((m) => !m.hasBeenGuessed);
  return count ? filterNoneGuessed.slice(0, count) : filterNoneGuessed;
};

const getMovieByImdbId = (
  movies: MovieBusinessModel[],
  id: string,
): MovieBusinessModel => {
  const movie = movies.find((m) => m.imdbId === id);
  return movie;
};

const addMovie = (store: DataStore, movie: MovieDto) => {
  if (!movie.imdbId) {
    throw new UnprocessableEntityException();
  }
  const movieExists = getMovieByImdbId(store.movies, movie.imdbId);
  if (!!movieExists) {
    return movieExists;
  }
  const nextMovie = parseDtoToBusinessModel(movie);
  store.movies.push(nextMovie);

  return nextMovie;
};

const updateMovie = (
  store: DataStore,
  id: string,
  movie: MovieUpdateDto,
): MovieBusinessModel => {
  const currentIndex = store.movies.findIndex((m) => m.imdbId === id);
  if (currentIndex === -1) {
    throw new NotFoundException();
  }
  store.movies[currentIndex] = {
    ...store.movies[currentIndex],
    hasBeenGuessed: movie.hasBeenGuessed,
    guesser: movie.guesser,
    dateGuessed: movie.dateGuessed,
  };

  return { ...store.movies[currentIndex] };
};

const getListMetaData = (store: DataStore) => {
  const meta = {
    totalSize: store.movies.length,
    latestId: store.movies[store.movies.length - 1].id,
    totalUnGuessed: store.movies.filter((m) => !m.hasBeenGuessed).length,
  };

  return meta;
};

const buildStore = (data: Movie[]) => {
  const dataStore: DataStore = {
    movies: parseEntitiesToBusinessModels(data),
    meta: {
      mutationList: [],
      queryList: [],
      ttl: dateFns.add(new Date(), { hours: 6 }),
    },
  };

  return dataStore;
};

const createDataStore = (data: Movie[]) => {
  let dataStore = buildStore(data);

  const store: any = {};

  store.getDataStore = () => ({ ...dataStore });
  store.getNextId = () => dataStore.movies[dataStore.movies.length - 1].id + 1;
  store.getAllMovies = () => [...dataStore.movies];
  store.getNoneGuessedMovies = (count?: number) =>
    getNoneGuessedMovied(dataStore.movies, count);
  store.getMovieByImdbId = (id: string) =>
    getMovieByImdbId(store.getAllMovies(), id);
  store.addMovie = (movie: MovieDto) => addMovie(dataStore, movie);
  store.addMovieByImdbId = (id: string) => new MovieBusinessModel();
  store.updateMovie = (id: string, movie: MovieUpdateDto) =>
    updateMovie(dataStore, id, movie);
  store.getListMetaData = () => getListMetaData(dataStore);
  store.resetData = (data: Movie[]) => (dataStore = buildStore(data));
  store.isCacheExpired = () => dateFns.isAfter(dataStore.meta.ttl, new Date());

  return store as MemoryDataStore;
};

export default createDataStore;
