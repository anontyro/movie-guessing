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
} from 'semantic-ui-react';
import BaseCard from '../../components/Cards/BaseCard';
import { useState } from 'react';
import { getDataFetch } from '../../utils/fetchData';

const API_ROUTES = {
  GET_ALL_MOVIES: 'api/movies/all',
  GET_ALL_NONE_GUESSED: 'api/movies',
};
interface PropsApiRequests {
  currentUser: User;
  getData: (url: string) => () => Promise<void>;
}

const ApiRequests: React.FC<PropsApiRequests> = ({ currentUser, getData }) => {
  return (
    <>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="desktop" />
          API Requests
        </Header>
      </Divider>
      <Card.Group>
        <BaseCard>
          <>
            <Card.Content>
              <Card.Header>Get Next Movies</Card.Header>
              <Card.Meta>Return the next 5 movis to guess</Card.Meta>
              <Card.Description>
                Will query the data and return the next 5 movies at random to
                guess
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="button">
                <Button
                  onClick={getData(API_ROUTES.GET_ALL_NONE_GUESSED)}
                  basic
                  color="green"
                >
                  GET
                </Button>
              </div>
            </Card.Content>
          </>
        </BaseCard>
        <BaseCard isDimmed={currentUser.apiToken.length === 0}>
          <>
            <Card.Content>
              <Card.Header>Get All Movies</Card.Header>
              <Card.Meta>Return the next 5 movis to guess</Card.Meta>
              <Card.Description>
                Will query the data and return the next 5 movies at random to
                guess
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="button">
                <Button
                  onClick={getData(API_ROUTES.GET_ALL_MOVIES)}
                  basic
                  color="green"
                >
                  GET
                </Button>
              </div>
            </Card.Content>
          </>
        </BaseCard>
      </Card.Group>
    </>
  );
};

const HomePage = () => {
  const [currentUser, setCurrentUser] = useUser();
  const [apiData, setApiData]: [
    apiData: any[],
    setApiData: (val: any) => void,
  ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = (url: string) => async (): Promise<void> => {
    try {
      setIsLoading(true);
      const authToken = currentUser.apiToken;
      const data = await getDataFetch(url, authToken);
      if (data.statusCode === 403) {
        setCurrentUser({
          ...currentUser,
          apiToken: '',
        });
        throw new Error('enter a valid auth token');
      }
      if (data.statusCode === 200) {
        setApiData(data.body);
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
      <ApiRequests currentUser={currentUser} getData={getData} />

      <Divider horizontal>
        <Header as="h4">
          <Icon name="eye" />
          Results
        </Header>
      </Divider>
      <>
        {apiData.map((movie) => (
          <div>{movie.name}</div>
        ))}
      </>
    </MainLayout>
  );
};

export default HomePage;
