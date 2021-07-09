import React from 'react';
import MovieItem from '../../../interfaces/MovieItem';
import styled from '@emotion/styled';
import MOVIE_ROUTES from '../../../consts/movieRoutes';
import DisplayAllMovies from './Movies/DisplayAllMovies';
import NoneGuessedResults from './Movies/NoneGuessedResults';

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface CurrentResultsViewProps {
  movies: MovieItem[];
  lastEndpointCalled: string | null;
}

const CurrentResultsView: React.FC<CurrentResultsViewProps> = ({
  movies,
  lastEndpointCalled,
}) => {
  switch (lastEndpointCalled) {
    case MOVIE_ROUTES.GET_ALL_MOVIES:
      return <DisplayAllMovies movies={movies} />;
    case MOVIE_ROUTES.GET_ALL_NONE_GUESSED:
      return <NoneGuessedResults movies={movies} />;
    default:
      return <></>;
  }
};

interface Props {
  movies: MovieItem[];
  lastEndpointCalled: string | null;
}

const MovieResults: React.FC<Props> = ({ movies, lastEndpointCalled }) => {
  return (
    <ResultsContainer>
      <CurrentResultsView
        movies={movies}
        lastEndpointCalled={lastEndpointCalled}
      />
    </ResultsContainer>
  );
};

export default MovieResults;
