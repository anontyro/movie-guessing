import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.5rem;
  height: 6rem;
`;

interface BaseCardProps {
  children: {
    header?: ReactNode;
    content: ReactNode;
  };
  as?: React.FC;
  draggable?: boolean;
  dragStart?: (event: React.DragEvent<HTMLDivElement>) => any;
}

const BaseCard: React.FC<BaseCardProps> = ({
  children,
  as: Card = CardContainer,
  draggable,
  dragStart = (event: React.DragEvent<HTMLDivElement>) => {},
}) => {
  return (
    <Card draggable={draggable} onDragStart={dragStart}>
      {children.header ? (
        <div className="card-header">{children.header}</div>
      ) : null}
      {children.content}
    </Card>
  );
};

export default BaseCard;
