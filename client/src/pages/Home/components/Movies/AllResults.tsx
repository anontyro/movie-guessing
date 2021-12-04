import React, { useState } from 'react';
import MovieItem from '../../../../interfaces/MovieItem';
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
  Input,
  Dropdown,
  DropdownProps,
} from 'semantic-ui-react';
import styled from '@emotion/styled';
import BaseCard from '../../../../components/Cards/BaseCard/index';
import { getMostRecentDecades } from '../../../../utils/maths';
import mediaQueries from '../../../../consts/mediaQueries';
import { addEllipsis } from '../../../../utils/textHelpers';

const MovieCardHeader = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.2rem 0;
`;

const MovieCardContent = styled.div`
  display: flex;
  align-items: last baseline;
  justify-content: space-between;
  color: #a5a5a5;
  height: 100%;
`;

const MainContainer = styled.div`
  height: 50vh;
  overflow-y: auto;
`;

const MainResultContainer = styled.div`
  ${mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
  ${mediaQueries.md} {
    grid-template-columns: 1fr 1fr;
  }
  ${mediaQueries.lg} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  ${mediaQueries.xl} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  max-height: 100%;
  overflow-y: auto;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  padding-right: 1rem;
`;

const MovieFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const MovieFilterRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > * {
    margin-right: 10px;
  }
  & > *:last-child {
    margin-right: 0;
  }

  @media (max-width: 600px) {
    & > * {
      margin-right: 0;
      margin-bottom: 10px;
      width: 100%;
    }
    & > *:last-child {
      margin-bottom: 0;
    }
  }
`;

interface MovieFilterProps {
  movies: MovieItem[];
  setFilteredMovies: (movies: MovieItem[]) => void;
}

const MovieFilter: React.FC<MovieFilterProps> = ({
  movies,
  setFilteredMovies,
}) => {
  const [query, setQuery] = useState('');

  const getStringQueryFilteredMovies = (val: string) => {
    const query = val.toLowerCase();
    const filtered = movies.filter((m) =>
      m.name.toLocaleLowerCase().includes(query),
    );

    return filtered;
  };

  const getMovieDecadeFilteredMovies = (val: number, movies: MovieItem[]) => {
    const filtered = movies.filter(
      (m) => m.releaseYear >= val && m.releaseYear <= val + 10,
    );

    return filtered;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (value.trim() === '' || value === null) {
      setFilteredMovies(movies);
      return;
    }
    const filtered = getStringQueryFilteredMovies(value);
    setFilteredMovies(filtered);
  };

  const recentDecades = getMostRecentDecades();
  const recentDecadesOptions = recentDecades.map((d, i) => ({
    key: i + 1,
    text: `${d}`,
    value: d,
  }));

  const [selectedDecade, setSelectedDecade] = useState<{
    key: number;
    text: string;
    value: number;
  }>({
    key: 0,
    text: '',
    value: 0,
  });
  const onDecadeChange = (event: any, data: DropdownProps) => {
    console.log(event.target.textContent);
    const value = event.target.textContent ?? '';
    const key = parseInt(value, 10) | 0;
    setSelectedDecade({
      key: key,
      text: value,
      value: key,
    });
    const filtered = getStringQueryFilteredMovies(query);
    if (key !== 0) {
      const filteredByDecade = getMovieDecadeFilteredMovies(key, filtered);
      setFilteredMovies(filteredByDecade);
    } else {
      setFilteredMovies(filtered);
    }
  };

  return (
    <MovieFilterContainer>
      <MovieFilterRow>
        <Input
          icon="search"
          placeholder="Find Movie..."
          value={query}
          onChange={onChange}
        />
        <Dropdown
          placeholder="Select Decade"
          options={recentDecadesOptions}
          clearable
          selection
          onChange={onDecadeChange}
          value={selectedDecade.value}
        />
      </MovieFilterRow>
    </MovieFilterContainer>
  );
};

interface Props {
  movies: MovieItem[];
  isActive: boolean;
  setIsActive: (val: boolean) => void;
}

const AllResults: React.FC<Props> = ({
  movies,
  isActive = true,
  setIsActive,
}) => {
  const onDragStart =
    (imdbId: string) => (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData('text/plain', imdbId);
      event.dataTransfer.effectAllowed = 'move';
    };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    console.log(`drop here with data`, data);
  };

  const [filteredMovies, setFilteredMovies] = useState(movies);

  return (
    <Accordion className="m-bot-1" fluid styled>
      <Accordion.Title active={isActive} onClick={() => setIsActive(!isActive)}>
        <Icon name="dropdown" />
        All Movies
      </Accordion.Title>
      <Accordion.Content active={isActive}>
        <MovieFilter movies={movies} setFilteredMovies={setFilteredMovies} />
        <MainContainer>
          <MainResultContainer>
            {filteredMovies.map((movie) => (
              <BaseCard
                draggable
                key={movie.imdbId}
                dragStart={onDragStart(movie.imdbId)}
              >
                {{
                  header: (
                    <MovieCardHeader>
                      <a
                        href={movie.imdbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {addEllipsis(movie.name, 50)}
                      </a>
                    </MovieCardHeader>
                  ),
                  content: (
                    <MovieCardContent>
                      <span>{movie.releaseYear}</span>
                      <Icon
                        name={
                          movie.hasBeenGuessed
                            ? 'check circle outline'
                            : 'circle outline'
                        }
                      />
                    </MovieCardContent>
                  ),
                }}
              </BaseCard>
            ))}
          </MainResultContainer>
        </MainContainer>
      </Accordion.Content>
    </Accordion>
  );
};

export default AllResults;
