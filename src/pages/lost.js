import React from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Lost() {
    return (
        <div className="flex flex-col w-full text-center min-h-screen justify-center">
            You're lost, return to Groupomania ? <br />
            <Link to={ROUTES.LOGIN} className="text-primary font-bold">Login</Link>
        </div>
    )
}
