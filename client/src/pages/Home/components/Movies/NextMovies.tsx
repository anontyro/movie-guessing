import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import MovieItem from '../../../../interfaces/MovieItem';
import StoredMovieItem from '../../../../interfaces/StoredMovieItem';
import {
  addMoviesToStorage,
  clearMovieStorage,
  getMoviesFromStorage,
} from '../../../../utils/localStorage';
import { randomIntFromInterval } from '../../../../utils/maths';
import { Button, Icon, Segment } from 'semantic-ui-react';
import styled from '@emotion/styled';
import 'react-datepicker/dist/react-datepicker.css';
import { getNextMonday } from '../../../../utils/dateHelpers';
import DisplayNext from './NextMovies/DisplayNext';

const NextMovieHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  h2 {
    margin: unset;
  }

  @media (max-width: 600px) {
    .buttons {
      display: flex;
    }
  }
`;

const WeekStartingPicker = styled(NextMovieHeader)`
  align-items: center;
  .react-datepicker-wrapper {
    display: flex;
    width: auto;
  }
  .week-starting-date-picker {
    border-radius: 5px;
    padding: 5px;
    text-align: center;
    &.disabled {
      color: #9ac7e9;
      background-color: #e8e8e8;
    }
  }
`;

interface Props {
  movies: MovieItem[];
}

const NextMovies: React.FC<Props> = ({ movies }) => {
  const [nextMovies, setNextMovies] = useState<StoredMovieItem[]>([]);
  const [hasPersistedData, setHasPersistedData] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

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
      isSkipped: false,
    }));
    return selectedMovies;
  };

  const setupNextMovies = () => {
    const fromStorage = getMoviesFromStorage();
    if (fromStorage) {
      setHasPersistedData(true);
      setStartDate(new Date(fromStorage.startDate));
      return fromStorage.storedMovies;
    }
    return getNextWeekMovies();
  };

  const randomiseMovies = (): void => {
    const setNextSelection = getNextWeekMovies();
    const currentMovies: StoredMovieItem[] = nextMovies.map((m) => {
      if (!m.isSkipped && setNextSelection.length > 0) {
        return setNextSelection.pop() as StoredMovieItem;
      }
      return m;
    });
    setNextMovies(currentMovies.length > 0 ? currentMovies : setNextSelection);
    setStartDate(getNextMonday(new Date()));
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

  const reselectItem = (imdbId: string, updatedId?: string) => {
    if (hasPersistedData) {
      return;
    }

    const currentMovies = [...nextMovies];
    const indexToReplace = currentMovies.findIndex((m) => m.imdbId === imdbId);
    if (indexToReplace !== -1) {
      let nextMovie = null;
      if (updatedId) {
        const movieToUpdate = movies.find((m) => m.imdbId === updatedId);
        const alreadyAdded = currentMovies.findIndex(
          (m) => m.imdbId === updatedId,
        );
        if (movieToUpdate && alreadyAdded === -1) {
          nextMovie = movieToUpdate;
        }
      } else {
        nextMovie = getNextUniqueMovie(currentMovies);
      }
      if (nextMovie) {
        currentMovies.splice(indexToReplace, 1, {
          ...nextMovie,
          completed: false,
          isSkipped: false,
        });
        setNextMovies(currentMovies);
      }
    }
  };

  const setAsSkipped = (imdbId: string) => {
    const index = nextMovies.findIndex((m) => m.imdbId === imdbId);
    if (index === -1) {
      return;
    }

    nextMovies[index].isSkipped = !nextMovies[index].isSkipped;
    setNextMovies([...nextMovies]);
  };

  const toggleLock = () => {
    if (hasPersistedData) {
      clearMovieStorage();
      setHasPersistedData(false);
      return;
    }

    setHasPersistedData(true);
    addMoviesToStorage({
      storedMovies: nextMovies,
      startDate: startDate,
    });
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
      <DisplayNext
        hasPersistedData={hasPersistedData}
        nextMovies={nextMovies}
        reselectItem={reselectItem}
        setAsSkipped={setAsSkipped}
      />
      <Segment vertical className="week-picker-container">
        <WeekStartingPicker>
          <span className="week-starting-title">Week Starting</span>
          <DatePicker
            readOnly={hasPersistedData ? true : false}
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            className={`${
              hasPersistedData ? 'disabled' : ''
            } week-starting-date-picker`}
          />
        </WeekStartingPicker>
      </Segment>
    </Segment.Group>
  );
};

export default NextMovies;
