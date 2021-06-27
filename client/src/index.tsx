import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import HomePage from './pages/Home';
import ContextRoute from './components/routing/ContextRoute';
import { UserProvider } from './context/user-context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <ContextRoute
        exact
        path="/"
        component={HomePage}
        contextComponent={UserProvider}
      /> */}
      <Route
        exact
        path="/"
        render={(props) => (
          <UserProvider>
            <HomePage />
          </UserProvider>
        )}
      />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
