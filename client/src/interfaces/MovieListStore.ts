import StoredMovieItem from './StoredMovieItem';

interface MoveListStore {
  storedMovies: StoredMovieItem[];
  startDate: Date;
}

export default MoveListStore;
