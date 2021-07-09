import React, { useEffect, useState } from 'react';
import MovieItem from '../../../interfaces/MovieItem';
import styled from '@emotion/styled';
import {
  Button,
  Card,
  Dimmer,
  Header,
  Icon,
  Image,
  Segment,
  Divider,
  Statistic,
  Grid,
} from 'semantic-ui-react';
import BaseCard from '../../../components/Cards/BaseCard';
import MOVIE_ROUTES from '../../../consts/movieRoutes';

const MovieListDays = styled.div`
  text-align: center;
  background-color: #ccdeff;
`;

const MovieListNextItem = styled.div`
height: 100%;
  display: flex;
  flex-direction: column;
  .main-movie-section{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ResultsMetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const randomIntFromInterval = (max: number, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

interface NoneGuessedResults {
  movies: MovieItem[];
}

const NoneGuessedResults: React.FC<NoneGuessedResults> = ({ movies }) => {
  const getNextWeekMovies = () => {
    const nextMovies: MovieItem[] = [];
    if (movies.length < 5) {
      return nextMovies;
    }
    while (nextMovies.length < 5) {
      const movieIndex = randomIntFromInterval(movies.length - 1);
      const movie = movies[movieIndex];
      const exists = nextMovies.find(
        (m: MovieItem) => m.imdbId === movie?.imdbId,
      );
      if (movie && !movie.hasBeenGuessed && !exists) {
        nextMovies.push(movie);
      }
    }
    return nextMovies;
  };

  const [nextMovies, setNextMovies] = useState(getNextWeekMovies());

  return (
    <>
      <Segment.Group>
        <Segment vertical>
          <Header textAlign="center" as="h2">
            <Header.Content>Next Movie List</Header.Content>
          </Header>
        </Segment>
        <Segment>
          <Grid columns="equal">
            <Grid.Row as={MovieListDays}>
              <Grid.Column>Monday</Grid.Column>
              <Grid.Column>Tuesday</Grid.Column>
              <Grid.Column>Wednesday</Grid.Column>
              <Grid.Column>Thursday</Grid.Column>
              <Grid.Column>Friday</Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              {nextMovies.map((m) => (
                <Grid.Column key={m.imdbId}>
                  <MovieListNextItem>
                    <div className="main-movie-section">
                      <a target="blank" href={m.imdbUrl}>
                        {m.name}
                      </a>
                      {m.releaseYear}
                    </div>
                    <Button basic color="blue">
                      Reselect
                    </Button>
                  </MovieListNextItem>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>

      <Segment.Group className="w-100" >
        <Segment vertical>
          <Header textAlign="center" as="h2">
            <Header.Content>All Movies</Header.Content>
          </Header>
        </Segment>
      <Segment>Display all</Segment>
      </Segment.Group>
    </>
  );
};

interface AllResultsProps {
  movies: MovieItem[];
}

const AllResults: React.FC<AllResultsProps> = ({ movies }) => (
  <ResultsContainer>
    {movies.map((movie) => (
      <BaseCard key={movie.imdbId}>
        <Card.Content>
          <Card.Header>
            <a target="blank" href={movie.imdbUrl}>
              {movie.name}
            </a>
          </Card.Header>
          <Card.Meta>
            <ResultsMetaContainer>
              {movie.releaseYear}
              <Icon
                name={
                  movie.hasBeenGuessed
                    ? 'check circle outline'
                    : 'circle outline'
                }
              />
            </ResultsMetaContainer>
          </Card.Meta>
        </Card.Content>
      </BaseCard>
    ))}
  </ResultsContainer>
);

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
      return <AllResults movies={movies} />;
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
