import React from 'react';
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
} from 'semantic-ui-react';
import styled from '@emotion/styled';
import BaseCard from '../../../../components/Cards/BaseCard';

const MainResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 50vh;
  overflow-y: auto;
`;

const ResultsMetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  movies: MovieItem[];
  isActive: boolean;
  setIsActive: (val: boolean) => void;
}

const AllResults: React.FC<Props> = ({
  movies,
  isActive = true,
  setIsActive,
}) => (
  <Accordion className="m-bot-1" fluid styled>
    <Accordion.Title active={isActive} onClick={() => setIsActive(!isActive)}>
      <Icon name="dropdown" />
      All Movies
    </Accordion.Title>
    <Accordion.Content active={isActive}>
      <MainResultContainer>
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
      </MainResultContainer>
    </Accordion.Content>
  </Accordion>
);


export default AllResults;