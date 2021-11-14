import React from 'react';
import { Route } from 'react-router-dom';

const ContextRoute = ({ contextComponent, component, ...rest }: any) => {
  const { Provider } = contextComponent;
  const Component = component;

  return (
    <Route
      {...rest}
      children={
        <Provider>
          <Component />
        </Provider>
      }
    />
  );
};

export default ContextRoute;
