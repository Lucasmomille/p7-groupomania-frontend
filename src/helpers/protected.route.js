import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

// rest to spread if another props

export default function ProtectedRoute({ user, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (user) {
                    return React.cloneElement(children, { user });
                }

                if (!user) {
                    console.log("no user")
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
                                state: { from: location }
                            }}
                        />
                    );
                }

                return null;
            }}
        />
    );
}

ProtectedRoute.propTypes = {
    user: PropTypes.string,
    children: PropTypes.object.isRequired
};