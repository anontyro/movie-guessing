import React, { useEffect, useState } from 'react';
import MovieItem from '../../../../interfaces/MovieItem';
import StoredMovieItem from '../../../../interfaces/StoredMovieItem';
import {
  addMoviesToStorage,
  clearMovieStorage,
  getMoviesFromStorage,
} from '../../../../utils/localStorage';
import { randomIntFromInterval } from '../../../../utils/maths';
import { Button, Icon, Segment, Grid, Modal, Form } from 'semantic-ui-react';
import styled from '@emotion/styled';
import { useUser } from '../../../../context/user-context';
import * as dateFns from 'date-fns';

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

interface Props {
  movies: MovieItem[];
}

const NextMovies: React.FC<Props> = ({ movies }) => {
  const [nextMovies, setNextMovies] = useState<StoredMovieItem[]>([]);
  const [hasPersistedData, setHasPersistedData] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<
    StoredMovieItem | undefined
  >(undefined);

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

  const setupNextMovies = () => {
    const fromStorage = getMoviesFromStorage();
    if (fromStorage) {
      setHasPersistedData(true);
      return fromStorage;
    }
    return getNextWeekMovies();
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
        currentMovies.splice(indexToReplace, 1, {
          ...nextMovie,
          completed: false,
        });
        setNextMovies(currentMovies);
      }
    }
  };

  const toggleLock = () => {
    if (hasPersistedData) {
      clearMovieStorage();
      setHasPersistedData(false);
      return;
    }

    setHasPersistedData(true);
    addMoviesToStorage(nextMovies);
  };

  useEffect(() => {
    setNextMovies(setupNextMovies());
  }, []);

  return (
    <Segment.Group className="w-100">
      <Segment vertical>
        <NextMovieHeader>
          <h2>Next Movie List</h2>
          <div className="buttons">
            <Button disabled={hasPersistedData} onClick={randomiseMovies} icon>
              <Icon name="random" />
            </Button>
            <Button
              disabled={nextMovies.length === 0 ? true : false}
              onClick={toggleLock}
              icon
            >
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
                  <UpdateMovieWithWinnerModal
                    isOpen={isSubmitOpen}
                    onOpen={() => {
                      setIsSubmitOpen(true);
                      setSelectedMovie(m);
                    }}
                    onClose={() => setIsSubmitOpen(false)}
                    movie={selectedMovie}
                  />
                </MovieListNextItem>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

interface UpdateMovieWithWinnerModalProps {
  movie?: StoredMovieItem;
  onClose: any;
  onOpen: any;
  isOpen: boolean;
}
const UpdateMovieWithWinnerModal: React.FC<UpdateMovieWithWinnerModalProps> = ({
  movie,
  onClose,
  onOpen,
  isOpen,
}) => {
  const [currentUser, setCurrentUser] = useUser();
  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={isOpen}
      trigger={
        <Button
          disabled={currentUser.apiToken.length === 0}
          color="green"
          basic
        >
          {currentUser.apiToken.length === 0 ? 'Token Required' : 'Set Winner'}
        </Button>
      }
    >
      {movie && (
        <>
          <Modal.Header>Add Winner for {movie.name}</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label htmlFor="">Winners Name</label>
                <input type="text" placeholder="winners name" />
              </Form.Field>
              <Form.Field>
                <label htmlFor="">Date Guessed</label>
                <input
                  disabled
                  value={dateFns.format(new Date(), 'yyyy-MM-dd')}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={onClose}>
              Close
            </Button>
            <Button
              content="Update Winner"
              labelPosition="right"
              icon="checkmark"
              positive
            />
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
};

export default NextMovies;
