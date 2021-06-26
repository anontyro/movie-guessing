import React, { createRef } from 'react';
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

const BodyContainer = styled.div`
  margin-top: 2rem;
`;

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
            <Menu.Item position="right">
              <Input placeholder="Add Token" />
              <Button as="a" inverted style={{ marginLeft: '0.5em' }}>
                Add
              </Button>
            </Menu.Item>
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
