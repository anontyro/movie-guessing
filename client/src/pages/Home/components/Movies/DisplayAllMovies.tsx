import React, {useState} from 'react';
import MovieItem from '../../../../interfaces/MovieItem';
import AllResults from './AllResults';

interface DisplayAllMoviesProps {
  movies: MovieItem[];
}

const DisplayAllMovies: React.FC<DisplayAllMoviesProps> = ({ movies }) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <AllResults movies={movies} isActive={isActive} setIsActive={setIsActive} />
  );
};

export default DisplayAllMovies;
