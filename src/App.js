/* eslint-disable */
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/userContext';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Lost = lazy(() => import('./pages/lost'));
const Profile = lazy(() => import('./pages/profile'));

function App() {

  const [userToken, setUserToken] = useState();

  React.useEffect(() => {
    const info = JSON.parse(sessionStorage.getItem("infoUser")) || "";
    setUserToken(info)
  }, [])

  /* React.useEffect(() => {
    sessionStorage.setItem("infoUser", JSON.stringify(userToken));

  }, [userToken]) */
  return (
    <div >
      <UserContext.Provider value={{ userToken, setUserToken }}>
        <Router >
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGNUP} component={SignUp} />
              <Route path={ROUTES.PROFILE} component={Profile} />
              <Route path={ROUTES.DASHBOARD} exact component={Dashboard} />
              <Route path={ROUTES.LOST} component={Lost} />
            </Switch>
          </Suspense>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
