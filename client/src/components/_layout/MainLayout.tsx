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
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  height: 100%;
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
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const FooterContainer = styled.footer`
  background-color: black;
  height: 100px;
  color: white;
  flex-shrink: 0;
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

const NavBar = styled.div`
  display: flex;
  width: 100%;
  color: white;
  background-color: black;
  height: 6rem;
  padding: 1rem 3rem;
  flex-shrink: 0;
`;

const MainMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
`;

const MenuContainer = styled.div`
  margin: auto;
  display: inline;
  .main-container {
    flex-grow: 1;
  }
`;

const MainContainer = styled(MenuContainer)`
  flex-grow: 1;
`;

const MenuContainerMobileHide = styled(MenuContainer)`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const MenuItem = styled(Link)`
  margin: 1rem;
  font-size: 1.7rem;
  color: white;
  cursor: pointer;
  .active {
    cursor: unset;
    text-decoration: underline;
    color: blue;
  }
`;

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => (
  <PageContainer>
    <NavBar>
      <MainMenu>
        <MainContainer>
          <MenuItem to="/" className="active">
            Home
          </MenuItem>
          <MenuItem to="/about" className="">
            About
          </MenuItem>
        </MainContainer>
        <MenuContainerMobileHide>
          <TokenMenu />
        </MenuContainerMobileHide>
      </MainMenu>
    </NavBar>
    <BodyContainer>{children}</BodyContainer>

    <FooterContainer>footer</FooterContainer>
  </PageContainer>
);

export default MainLayout;
