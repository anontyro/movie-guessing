import React from 'react';
import { Route } from 'react-router-dom';

const ContextRoute = ({ contextComponent, component, ...rest }: any) => {
  const { Provider } = contextComponent;
  const Component = component;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Provider>
          <Component {...props} />
        </Provider>
      )}
    />
  );
};

export default ContextRoute;
