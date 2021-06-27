import React, { useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Input,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Sticky,
} from 'semantic-ui-react';
import styled from '@emotion/styled';
import { useUser } from '../../context/user-context';

const BodyContainer = styled.div`
  margin-top: 2rem;
`;

const TokenMenu = () => {
  const [currentUser, setCurrentUser] = useUser();
  const [token, setToken] = useState(currentUser.apiToken);
  return (
    <Menu.Item position="right">
      <Input
        disabled={currentUser.apiToken.length > 0}
        placeholder="Add Api Token"
        onChange={(e) => setToken(e.target.value)}
        value={token}
      />
      <Button
        onClick={() =>
          setCurrentUser({
            apiToken: token,
          })
        }
        as="a"
        inverted
        style={{ marginLeft: '0.5em' }}
      >
        Add
      </Button>
    </Menu.Item>
  );
};

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => (
  <div className="main-layout">
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
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <BodyContainer>{children}</BodyContainer>
      </Grid.Row>
      <Grid.Row>
        <footer>footer</footer>
      </Grid.Row>
    </Grid>
  </div>
);

export default MainLayout;
