import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import { UserProvider } from './context/user-context';
import './App.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <ContextRoute
        exact
        path="/"
        component={HomePage}
        contextComponent={UserProvider}
      /> */}
        <Route
          path="/"
          element={
            <div>
              <UserProvider>
                <Helmet>
                  <title>Home</title>
                  <link
                    rel="canonical"
                    href="https://movie-guessing.alexwilkinson.co/"
                  />
                  <meta
                    property="og:description"
                    content="A simple movie guessing game allowing people to come together and try to guess the movies"
                  />
                </Helmet>
                <HomePage />
              </UserProvider>
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div>
              <UserProvider>
                <Helmet>
                  <title>About</title>
                  <link
                    rel="canonical"
                    href="https://movie-guessing.alexwilkinson.co/about"
                  />
                  <meta
                    property="og:description"
                    content="Information about the stack used and a brief about what this is"
                  />
                </Helmet>
                <AboutPage />
              </UserProvider>
            </div>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
