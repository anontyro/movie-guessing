import MainLayout from '../../components/_layout/MainLayout';
import { useUser } from '../../context/user-context';
import {
  Button,
  Card,
  Dimmer,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';

interface ApiCardProps {
  children: React.ReactNode;
  isDimmed?: boolean;
}

const ApiCard: React.FC<ApiCardProps> = ({ children, isDimmed = false }) => {
  return (
    <div>
      <Dimmer.Dimmable as={Card} dimmed={isDimmed}>
        {children}
        <Dimmer active={isDimmed}>
          <Header as="h2" icon inverted>
            <Icon name="user secret" />
            Requires API Token
          </Header>
        </Dimmer>
      </Dimmer.Dimmable>
    </div>
  );
};

const HomePage = () => {
  const [currentUser, setCurrentUser] = useUser();
  return (
    <MainLayout>
      <Card.Group>
        <ApiCard>
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
                <Button basic color="green">
                  GET
                </Button>
              </div>
            </Card.Content>
          </>
        </ApiCard>
        <ApiCard isDimmed={currentUser.apiToken.length === 0}>
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
                <Button basic color="green">
                  GET
                </Button>
              </div>
            </Card.Content>
          </>
        </ApiCard>
      </Card.Group>
    </MainLayout>
  );
};

export default HomePage;
