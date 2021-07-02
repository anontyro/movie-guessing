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
