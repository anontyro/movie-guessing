import MovieItem from './MovieItem';

interface StoredMovieItem extends MovieItem {
  completed: boolean;
  isSkipped: boolean;
}

export default StoredMovieItem;
