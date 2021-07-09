import React, { useState } from 'react';
import MovieItem from '../../../../interfaces/MovieItem';
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
  Accordion,
} from 'semantic-ui-react';
import AllResults from '../Movies/AllResults';
import StoredMovieItem from '../../../../interfaces/StoredMovieItem';
import { randomIntFromInterval } from '../../../../utils/maths';
import { addMoviesToStorage, clearMovieStorage, getMoviesFromStorage } from '../../../../utils/localStorage';
import { useEffect } from 'react';

const MovieListDays = styled.div`
  text-align: center;
  background-color: #ccdeff;
`;

const MovieListNextItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .main-movie-section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 80px;
    overflow: hidden;
    .main-movie-title {
      flex-grow: 1;
    }
    .main-movie-release-year {
      padding: 10px;
    }
  }
`;

const NextMovieHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  h2 {
    margin: unset;
  }
`;

interface NoneGuessedResults {
  movies: MovieItem[];
}

const NoneGuessedResults: React.FC<NoneGuessedResults> = ({ movies }) => {
  const getNextWeekMovies = (): StoredMovieItem[] => {
    const nextMovies: MovieItem[] = [];
    if (movies.length < 5) {
      return [];
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
    const selectedMovies: StoredMovieItem[] = nextMovies.map((m) => ({
      ...m,
      completed: false,
    }));
    return selectedMovies;
  };

  const randomiseMovies = (): void => {
    const nextMovies = getNextWeekMovies();
    setNextMovies(nextMovies);
  };

  const getNextUniqueMovie = (currentMovies: MovieItem[]): MovieItem | null => {
    if (movies.length < 5) {
      return null;
    }
    const nextMovie = randomIntFromInterval(movies.length - 1);
    const movie = movies[nextMovie];
    const exists = currentMovies.find((m) => m.imdbUrl === movie?.imdbId);
    if (movie && !movie.hasBeenGuessed && !exists) {
      return movie;
    }

    return getNextUniqueMovie(currentMovies);
  };

  const reselectItem = (imdbId: string) => {
    const currentMovies = [...nextMovies];
    const indexToReplace = currentMovies.findIndex((m) => m.imdbId === imdbId);
    if (indexToReplace !== -1) {
      const nextMovie = getNextUniqueMovie(currentMovies);
      if (nextMovie) {
        currentMovies.splice(indexToReplace, 1, { ...nextMovie, completed: false});
        setNextMovies(currentMovies);
      }
    }
  };

  const setupNextMovies = () => {
    const fromStorage = getMoviesFromStorage();
    if (fromStorage) {
      setHasPersistedData(true);
      return fromStorage;
    }
    return getNextWeekMovies();
  };

  const toggleLock = () => {
      if(hasPersistedData){
          clearMovieStorage();
          setHasPersistedData(false);
          return;
      }

      setHasPersistedData(true);
      addMoviesToStorage(nextMovies);
  }

  useEffect(() => {
    setNextMovies(setupNextMovies());
  }, []);

  const [nextMovies, setNextMovies] = useState<StoredMovieItem[]>([]);
  const [hasPersistedData, setHasPersistedData] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isAllMoviesActive, setIsAllMoviesActive] = useState(false);

  return (
    <>
      <Segment.Group>
        <Segment vertical>
          <NextMovieHeader>
            <h2>Next Movie List</h2>
            <div className="buttons">
              <Button
                disabled={hasPersistedData}
                onClick={randomiseMovies}
                icon
              >
                <Icon name="random" />
              </Button>
              <Button onClick={toggleLock} icon>
                <Icon name={hasPersistedData ? 'unlock' : 'lock'} />
              </Button>
            </div>
          </NextMovieHeader>
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
                      <a
                        className="main-movie-title"
                        target="blank"
                        href={m.imdbUrl}
                      >
                        {m.name}
                      </a>
                      <span className="main-movie-release-year">
                        {m.releaseYear}
                      </span>
                    </div>
                    <Button
                      disabled={hasPersistedData}
                      onClick={() => reselectItem(m.imdbId)}
                      basic
                      color="blue"
                    >
                      Reselect
                    </Button>
                  </MovieListNextItem>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
      <AllResults
        movies={movies}
        isActive={isAllMoviesActive}
        setIsActive={setIsAllMoviesActive}
      />
    </>
  );
};

export default NoneGuessedResults;
