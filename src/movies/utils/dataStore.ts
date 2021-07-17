import { MovieUpdateDto } from '../dtos/movie-update.dto';
import { Movie } from '../entities/movie.entity';
import * as dateFns from 'date-fns';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { parseEntitiesToBusinessModels } from './modelParsers';
import { MovieBusinessModel } from '../models/movie.businessmodel';
import { MovieMetaData } from '../models/moveMetaData.model';

interface DataStoreMeta {
  ttl: Date;
  queryList: [];
  mutationList: [];
}
interface DataStore {
  movies: MovieBusinessModel[];
  meta: DataStoreMeta;
}

export interface MemoryDataStore {
  getDataStore: () => DataStore;
  resetData: (data?: Movie[]) => void;
  getNextId: () => number;
  getAllMovies: () => MovieBusinessModel[];
  getNoneGuessedMovies: (count?: number) => MovieBusinessModel[];
  getMovieByImdbId: (id: string) => MovieBusinessModel;
  addMovie: (movie: MovieBusinessModel) => MovieBusinessModel;
  addMovieByImdbId: (id: string) => MovieBusinessModel;
  updateMovie: (
    id: string,
    movie: Partial<MovieBusinessModel>,
  ) => MovieBusinessModel;
  getMovieMetaData: () => MovieMetaData;
  isCacheExpired: () => boolean;
  getStoreData: () => DataStoreMeta;
}

const getNoneGuessedMovies = (
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

const addMovie = (store: DataStore, movie: MovieBusinessModel) => {
  if (!movie.imdbId) {
    throw new UnprocessableEntityException();
  }
  const movieExists = getMovieByImdbId(store.movies, movie.imdbId);
  if (!!movieExists) {
    return movieExists;
  }
  store.movies.push(movie);

  return movie;
};

const updateMovie = (
  store: DataStore,
  id: string,
  movie: Partial<MovieBusinessModel>,
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

const getMovieMetaData = (store: DataStore): MovieMetaData => {
  const total = store.movies;
  const totalWithValues = total.filter((m) => !!m.imdbId).length;
  const totalEmpty = total.length - totalWithValues;
  const totalGuessed = total.filter((m) => !!m.guesser).length;
  const totalUnguessed = totalWithValues - totalGuessed;
  const weeksLeft = Math.floor(totalUnguessed / 5);
  const monthsLeft = Math.floor(weeksLeft / 4);

  const meta = new MovieMetaData(
    totalWithValues,
    totalEmpty,
    totalGuessed,
    totalUnguessed,
    weeksLeft,
    monthsLeft,
  );

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
    getNoneGuessedMovies(dataStore.movies, count);
  store.getMovieByImdbId = (id: string) =>
    getMovieByImdbId(store.getAllMovies(), id);
  store.addMovie = (movie: MovieBusinessModel) => addMovie(dataStore, movie);
  store.addMovieByImdbId = (id: string) => new MovieBusinessModel();
  store.updateMovie = (id: string, movie: MovieUpdateDto) =>
    updateMovie(dataStore, id, movie);
  store.getMovieMetaData = () => getMovieMetaData(dataStore);
  store.resetData = (data: Movie[]) => (dataStore = buildStore(data));
  store.isCacheExpired = () => dateFns.isAfter(new Date(), dataStore.meta.ttl);
  store.getStoreData = () => dataStore.meta;

  return store as MemoryDataStore;
};

export default createDataStore;
