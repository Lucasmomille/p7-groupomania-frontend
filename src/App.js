/* eslint-disable */
import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';


const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Lost = lazy(() => import('./pages/lost'));


function App() {
  return (
    <div >
      <Router >
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOST} component={Lost} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGNUP} component={SignUp} />
            <Route path={ROUTES.DASHBOARD} exact component={Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
