import MovieItem from "./MovieItem";

interface StoredMovieItem extends MovieItem{
    completed: boolean;
}

export default StoredMovieItem;