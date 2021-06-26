// import './App.css';
import React from 'react';
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
} from 'semantic-ui-react';

interface Props {
  children: React.ReactNode;
}

const App: React.FC<Props> = ({ children }) => {
  return (
    <div className="App">
      <Segment inverted textAlign="center" vertical>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item>Home</Menu.Item>
            <Menu.Item position="right">
              <Input placeholder="Add Token" />
              <Button as="a" inverted>
                Add
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>{children}</Grid.Row>
        <Grid.Row>
          <footer>footer</footer>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default App;
