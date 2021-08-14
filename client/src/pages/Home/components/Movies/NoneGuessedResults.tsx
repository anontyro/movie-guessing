import React, { useState, useEffect } from 'react';
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
  Portal,
  Modal,
  Form,
} from 'semantic-ui-react';
import AllResults from '../Movies/AllResults';

interface NoneGuessedResults {
  movies: MovieItem[];
}

const NoneGuessedResults: React.FC<NoneGuessedResults> = ({ movies }) => {
  const [isAllMoviesActive, setIsAllMoviesActive] = useState(false);

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

  return (
    <>
      <AllResults
        movies={movies}
        isActive={isAllMoviesActive}
        setIsActive={setIsAllMoviesActive}
      />
    </>
  );
};

export default NoneGuessedResults;
