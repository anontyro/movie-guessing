import React from 'react';
import { User, useUser } from '../../../context/user-context';
import styled from '@emotion/styled';
import { Button, Card, Header, Icon, Divider } from 'semantic-ui-react';
import BaseCard from '../../../components/Cards/BaseCard';
import MOVIE_ROUTES from '../../../consts/movieRoutes';

interface PropsApiRequests {
  currentUser: User;
  getData: (url: string) => () => Promise<void>;
  isLoading: boolean;
}

const ApiRequests: React.FC<PropsApiRequests> = ({
  currentUser,
  getData,
  isLoading,
}) => {
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
                  onClick={getData(MOVIE_ROUTES.GET_ALL_NONE_GUESSED)}
                  basic
                  color="green"
                  loading={isLoading}
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
              <Card.Meta>Returns all movies</Card.Meta>
              <Card.Description>
                Will return all of the movies on the server currently
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="button">
                <Button
                  onClick={getData(MOVIE_ROUTES.GET_ALL_MOVIES)}
                  basic
                  color="green"
                  loading={isLoading}
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

export default ApiRequests;
