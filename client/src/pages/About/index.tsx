import React from 'react';
import MainLayout from '../../components/_layout/MainLayout';
import { Header, Image, Segment, Grid, Container } from 'semantic-ui-react';

const AboutPage: React.FC = () => {
  return (
    <MainLayout>
      <Segment.Group>
        <Segment>
          <h2>Technologies</h2>
        </Segment>
        <Segment>
          <Grid columns={6} stackable textAlign="center">
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon>
                  <Image src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" />
                  React
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon>
                  <Image src="https://react.semantic-ui.com/logo.png" />
                  Semantic UI
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon>
                  <Image src="https://docs.nestjs.com/assets/logo-small.svg" />
                  Nest JS
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon>
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" />
                  TypeScript
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon>
                  <Image src="https://sheet.best/images/logo.svg" />
                  Sheet.best
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon>
                  <Image src="https://www.docker.com/sites/default/files/d8/styles/role_icon/public/2019-07/vertical-logo-monochromatic.png?itok=erja9lKc" />
                  Docker
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>

      <Segment>
        <Container text>
          <Header as="h2">What is this?</Header>
          <p>
            This is a small app that I decided to build to help with an internal
            game we have started during the daily sync up where we try to guess
            what movie is the background. This is a game that expanded from
            something I would do in my team to something we do more company
            wide. It has proven to be quite the hit as it allows people a bit of
            an icebreaker and one that has gotten a lot more popular than I had
            first expected.
          </p>

          <Header as="h2">Choice of Technologies</Header>
          <p>
            When I started this game in mid 2020 I never expected it to last so
            long as a result I just remembered the movies and shows I used,
            however as this has continued one and seems like there is no sign of
            stopping, it was suggested to me to actaully start keeping a better
            list of the movies.
          </p>
          <p>
            This resulted in me just added them into a Google doc for
            simplicity. I didn't want to use a full database for this and keep
            it easy to edit as required, that is where Sheet.Best came in, as it
            allows REST connection to a Google Sheet. This provided the
            foundation for the app, however the free tier of sheet.best has a
            lot of limitations as a result I needed to build a backend.
          </p>
          <p>
            As Sheet.Best free tier has call limits each month and no way to
            protect the endpoint without paying I decided it made sense to build
            a backend for that. I had just started learning NestJS and it felt
            like a good chance to start using that. Due to the limited I am
            heavily caching the data from Google Docs and controlling how often
            it is read/ written to to prevent hitting the cap. My cache
            currently expires every 6 hours, this allows me to limit how often
            it is called per day. However I may still just use the Google Docs
            API to connect dirrectly to it at somepoint as a potential
            enhancement.
          </p>
          <p>
            The Frontend is React I am very familiar with React and always enjoy
            working with it I decided to try a new UI framework testing out
            Semantic UI which seems fairly fine but does have some limitations
            and quirks that make it not always the best as I prefer a bit more
            freedom with the CSS.
          </p>
        </Container>
      </Segment>
    </MainLayout>
  );
};

export default AboutPage;
