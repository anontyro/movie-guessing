import React from 'react';
import {
  Button,
  Card,
  Dimmer,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';
import styled from '@emotion/styled';

const CardContainer = styled.div`
  margin: 10px;
`;

interface ApiCardProps {
  children: React.ReactNode;
  isDimmed?: boolean;
}

const BaseCard: React.FC<ApiCardProps> = ({ children, isDimmed = false }) => {
  return (
    <CardContainer>
      <Dimmer.Dimmable as={Card} dimmed={isDimmed}>
        {children}
        <Dimmer active={isDimmed}>
          <Header as="h2" icon inverted>
            <Icon name="user secret" />
            Requires API Token
          </Header>
        </Dimmer>
      </Dimmer.Dimmable>
    </CardContainer>
  );
};

export default BaseCard;
