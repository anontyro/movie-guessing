import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import * as dateFns from 'date-fns';
import { Button, Icon, Segment, Grid } from 'semantic-ui-react';
import UpdateMovieWithWinnerModal from './UpdateMovieWithWinnerModal';
import StoredMovieItem from '../../../../../interfaces/StoredMovieItem';

const MovieListDays = styled.div`
  text-align: center;
  background-color: #ccdeff;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const MovieListNextItem = styled.div`
  position: relative;
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
    .skipped-day {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  }
`;

const NextMovieList = styled(Segment)`
  overflow-y: auto;
  .calendar-week {
    min-width: 1000px;
    .movie-day {
      color: gray;
      &.current-day {
        color: #0034ff;
      }
    }
  }
  .ui.grid > .row.calendar-movies {
    padding: 0;

    .column.movie-day-data {
      padding: 10px;
      &.current-day {
        background-color: #ccdeff;
      }
    }
  }
  .calendar-movies {
    height: 240px;
  }
  .control-buttons {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    > * {
      width: 45%;
    }
  }
`;

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

interface NextMovieHeadersProps {
  currentDay: string;
}

const NextMovieDayHeaders: React.FC<NextMovieHeadersProps> = ({
  currentDay,
}) => {
  return (
    <Grid.Row as={MovieListDays}>
      {WEEK_DAYS.map((day, index) => (
        <Grid.Column
          key={day + index}
          className={`movie-day ${currentDay === day ? 'current-day' : ''}`}
        >
          {day}
        </Grid.Column>
      ))}
    </Grid.Row>
  );
};

interface DisplayNextProps {
  hasPersistedData: boolean;
  nextMovies: StoredMovieItem[];
  reselectItem: (imdbId: string, updatedId?: string | undefined) => void;
  setAsSkipped: (imdbId: string) => void;
}

const DisplayNext: React.FC<DisplayNextProps> = ({
  hasPersistedData,
  nextMovies,
  reselectItem,
  setAsSkipped,
}) => {
  const currentDay = dateFns.format(new Date(), 'EEEE');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<
    StoredMovieItem | undefined
  >(undefined);

  const onDrop = (id: string) => (event: any) => {
    event.preventDefault();
    const data = event.dataTransfer;
    if (data) {
      data.dropEffect = 'move';
      const val = event.dataTransfer?.getData('text/plain');
      reselectItem(id, val);
    }
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
  };

  return (
    <NextMovieList>
      <Grid className="calendar-week" columns="equal">
        <NextMovieDayHeaders currentDay={currentDay} />
        <Grid.Row className="calendar-movies" textAlign="center">
          {nextMovies.map((m, i) => (
            <Grid.Column
              className={`movie-day-data ${
                currentDay === WEEK_DAYS[i] ? 'current-day' : ''
              }`}
              key={m.imdbId}
            >
              <MovieListNextItem
                onDrop={onDrop(m.imdbId)}
                onDragOver={onDragOver}
              >
                <div className="main-movie-section">
                  {m.isSkipped ? (
                    <>
                      <div className="skipped-day">
                        <h2>Day Skipped</h2>
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
                <div className="control-buttons">
                  <Button
                    disabled={hasPersistedData || m.isSkipped}
                    onClick={() => reselectItem(m.imdbId)}
                    basic
                    color="blue"
                    icon
                  >
                    <Icon name="random" />
                  </Button>
                  <Button
                    disabled={hasPersistedData}
                    onClick={() => setAsSkipped(m.imdbId)}
                    icon
                    color="blue"
                  >
                    <Icon name={m.isSkipped ? 'play' : 'pause'} />
                  </Button>
                </div>
                <UpdateMovieWithWinnerModal
                  isOpen={isSubmitOpen}
                  onOpen={() => {
                    setIsSubmitOpen(true);
                    setSelectedMovie(m);
                  }}
                  onClose={() => setIsSubmitOpen(false)}
                  movie={selectedMovie}
                />{' '}
              </MovieListNextItem>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </NextMovieList>
  );
};

export default DisplayNext;
