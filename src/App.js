/* eslint-disable */
import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/userContext';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Lost = lazy(() => import('./pages/lost'));


function App() {

  const [userToken, setUserToken] = useState();

  return (
    <div >
      <UserContext.Provider value={{ userToken, setUserToken }}>
        <Router >
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGNUP} component={SignUp} />
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
