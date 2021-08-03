/* eslint-disable */
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/userContext';
import PostContext from './context/postContext';
import UserInfoContext from './context/userInfoContext';
import ProtectedRoute from './helpers/protected.route';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Lost = lazy(() => import('./pages/lost'));
const Profile = lazy(() => import('./pages/profile'));

function App() {

  const [userToken, setUserToken] = useState();
  const [user, setUser] = useState();
  const [posts, setPost] = useState();

  React.useEffect(() => {
    const info = JSON.parse(sessionStorage.getItem("infoUser")) || null;
    //console.log(info)
    setUserToken(info)
  }, [])

  return (
    <div >
      <UserContext.Provider value={{ userToken, setUserToken }}>
        <UserInfoContext.Provider value={{ user, setUser }}>
          <PostContext.Provider value={{ posts, setPost }}>
            <Router >
              <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                  <Route exact path={ROUTES.LOGIN} component={Login} />
                  <Route exact path={ROUTES.SIGNUP} component={SignUp} />
                  <Route exact path={ROUTES.PROFILE} component={Profile} />
                  <ProtectedRoute user={userToken} path={ROUTES.DASHBOARD} exact>
                    <Dashboard />
                  </ProtectedRoute>
                  <Route component={Lost} />
                </Switch>
              </Suspense>
            </Router>
          </PostContext.Provider>
        </UserInfoContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
