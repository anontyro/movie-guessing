import React from 'react';
import MainLayout from '../../components/_layout/MainLayout';
import { User, useUser } from '../../context/user-context';
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
} from 'semantic-ui-react';
import { useState } from 'react';
import { getDataFetch } from '../../utils/fetchData';
import ApiRequests from './components/ApiRequests';
import MovieItem from '../../interfaces/MovieItem';
import MovieResults from './components/MovieResults';

const StatisticsContainer = styled.div``;

interface MovieStats {
  total: number;
  totalEmpty: number;
  totalGuessed: number;
  totalUnguessed: number;
  weeksLeft: number;
  monthsLeft: number;
}

const getPageData = async (imdbId: string) => {
  const url = `https://www.imdb.com/title/${imdbId}`;
  const data = await fetch(url);
  const text = await data.text();
  const parser = new DOMParser();

  const html = parser.parseFromString(text, 'text/html');

  return html;
};

const getStatistics = (apiData: MovieItem[]): MovieStats => {
  const totalWithValue = apiData.filter((m) => !!m.imdbId);
  const totalUnguessed = totalWithValue.filter((m) => !m.dateGuessed).length;
  const weeksLeft = totalUnguessed / 5;
  const monthsLeft = weeksLeft / 4;
  return {
    total: totalWithValue.length,
    totalEmpty: totalWithValue.length - apiData.length,
    totalGuessed: totalWithValue.length - totalUnguessed,
    totalUnguessed,
    weeksLeft,
    monthsLeft,
  };
};

const HomePage = () => {
  const [currentUser, setCurrentUser] = useUser();
  const [apiData, setApiData]: [
    apiData: {
      movies: MovieItem[];
      statistics: Partial<MovieStats>;
    },
    setApiData: (val: any) => void,
  ] = useState({
    movies: [],
    statistics: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastEnpointCalled, setLastEndpointCalled] = useState<string | null>(
    null,
  );

  const getData = (url: string, forced = false) => async (): Promise<void> => {
    if(lastEnpointCalled === url && apiData.movies.length > 0 && !forced){
      return;
    }
    try {
      setIsLoading(true);
      const authToken = currentUser.apiToken;
      const data = await getDataFetch<MovieItem[]>(url, authToken);
      if (data.statusCode === 403) {
        setCurrentUser({
          ...currentUser,
          apiToken: '',
        });
        throw new Error('enter a valid auth token');
      }
      if (data.statusCode === 200) {
        setApiData({
          movies: data.body.filter((m) => !!m.imdbId),
          statistics: getStatistics(data.body),
        });
        setLastEndpointCalled(url);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <ApiRequests
        currentUser={currentUser}
        getData={getData}
        isLoading={isLoading}
      />

      <Divider horizontal>
        <Header as="h4">
          <Icon name="eye" />
          Results
        </Header>
      </Divider>
      <Segment textAlign="center">
        <StatisticsContainer>
          <Statistic>
            <Statistic label="Total" value={apiData.statistics?.total ?? 0} />
          </Statistic>
          <Statistic>
            <Statistic
              label="Total Guessed"
              value={apiData.statistics?.totalGuessed ?? 0}
            />
          </Statistic>
          <Statistic>
            <Statistic
              label="Total Unguessed"
              value={apiData.statistics?.totalUnguessed ?? 0}
            />
          </Statistic>
          <Statistic>
            <Statistic
              label="Number of Weeks Left"
              value={apiData.statistics?.weeksLeft ?? 0}
            />
          </Statistic>
          <Statistic>
            <Statistic
              label="Number of Months Left"
              value={apiData.statistics?.monthsLeft ?? 0}
            />
          </Statistic>
        </StatisticsContainer>
      </Segment>
      <MovieResults movies={apiData.movies} lastEndpointCalled={lastEnpointCalled} />
    </MainLayout>
  );
};

export default HomePage;
