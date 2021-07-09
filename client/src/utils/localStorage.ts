import StoredMovieItem from "../interfaces/StoredMovieItem";
import * as dateFns from 'date-fns';

interface SavedMovies {
  dateStored: Date;
  movies: StoredMovieItem[];
}

const WEEK_MOVIE_KEY = 'MOVIES_THIS_WEEK';


export const getMoviesFromStorage = (): StoredMovieItem[] | null => {
  const items = localStorage.getItem(WEEK_MOVIE_KEY);
  if (!items) {
    return null;
  }
  const parsedItems: SavedMovies = JSON.parse(items);

  return parsedItems.movies;
};

export const clearMovieStorage = () => localStorage.removeItem(WEEK_MOVIE_KEY);

export const addMoviesToStorage = (movies: StoredMovieItem[]) => {
    const dateStored = new Date();

    const itemsToSave: SavedMovies = {
        dateStored,
        movies
    }

    const parsedItems = JSON.stringify(itemsToSave);
    localStorage.setItem(WEEK_MOVIE_KEY, parsedItems);
};