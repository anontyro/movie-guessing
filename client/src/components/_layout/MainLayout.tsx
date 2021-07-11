import React, { useState } from 'react';
import {
  Button,
  Container,
  Input,
  Menu,
  Segment,
  Sticky,
} from 'semantic-ui-react';
import styled from '@emotion/styled';
import { useUser } from '../../context/user-context';
import { getDataFetch } from '../../utils/fetchData';
import MOVIE_ROUTES from '../../consts/movieRoutes';
import {
  addTokenToStorage,
  clearTokenStorage,
  getTokenFromStorage,
} from '../../utils/localStorage';
import { useEffect } from 'react';

const PageContainer = styled.div`
  height: 94.3%;
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 75%;
  margin: auto;
  margin-top: 25px;
`;

const FooterContainer = styled.footer`
  background-color: black;
  height: 100px;
  color: white;
`;

const validateToken = async (token: string) => {
  try {
    const validate = await getDataFetch(MOVIE_ROUTES.VALIDATE_TOKEN, token);
    if (validate.statusCode === 403) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

const TokenMenu = () => {
  const [currentUser, setCurrentUser] = useUser();
  const [token, setToken] = useState(currentUser.apiToken);

  useEffect(() => {
    const storedToken = getTokenFromStorage();
    if (storedToken && storedToken.length > 0) {
      setCurrentUser({
        apiToken: storedToken,
      });
      setToken('Added From Storage');
    }
  }, []);

  const addToken = async () => {
    const isValid = await validateToken(token);
    if (!isValid) {
      setToken('');
      return;
    }
    addTokenToStorage(token);
    setCurrentUser({
      apiToken: token,
    });
  };

  const clearToken = () => {
    clearTokenStorage();
    setCurrentUser({
      apiToken: '',
    });
    setToken('');
  };

  return (
    <Menu.Item position="right">
      <Input
        disabled={currentUser.apiToken.length > 0}
        placeholder="Add Api Token"
        onChange={(e) => setToken(e.target.value)}
        value={token}
      />
      {currentUser.apiToken.length === 0 ? (
        <Button
          onClick={addToken}
          as="a"
          inverted
          style={{ marginLeft: '0.5em' }}
        >
          Add
        </Button>
      ) : (
        <Button
          as="a"
          onClick={clearToken}
          inverted
          style={{ marginLeft: '0.5em' }}
        >
          Clear
        </Button>
      )}
    </Menu.Item>
  );
};

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => (
  <>
    <Sticky>
      <Segment className="main-menu" inverted>
        <Menu inverted pointing secondary>
          <Container>
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <TokenMenu />
          </Container>
        </Menu>
      </Segment>
    </Sticky>

    <PageContainer>
      <BodyContainer>{children}</BodyContainer>

      <FooterContainer>footer</FooterContainer>
    </PageContainer>
  </>
);

export default MainLayout;
