interface MovieItem {
  imdbId: string;
  name: string;
  createdAt: string | Date;
  dateGuessed: string | Date | null;
  guesser: string;
  hasBeenGuessed: boolean;
  imdbUrl: string;
  releaseYear: number;
  type: string;
  weight: number;
}

export default MovieItem;
