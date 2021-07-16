/* eslint-disable */
import React, { useEffect, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as ROUTES from '../constants/routes';
import * as SVG from "../constants/svg"
import UserContext from '../context/userContext';

export default function Sidebar() {
    const { userToken, setUserToken } = useContext(UserContext);
    // route pour logout
    // clear local storage
    const logOut = () => {
        setUserToken(null);
        sessionStorage.clear();
    }
    return (
        <div className="w-3/12 bg-primary text-white min-h-screen flex flex-col items-center p-4 relative ">
            <div className="fixed flex w-3/12">
                {SVG.LOGOWHITE}
            </div>

            <nav className="space-y-6 flex flex-col mt-32 fixed">
                <NavLink exact to={ROUTES.DASHBOARD}
                    className=" h-16 w-16 flex items-center justify-center rounded-full" activeClassName="bg-red-300">
                    {SVG.HOME}
                </NavLink>
                <NavLink exact to={ROUTES.PROFILE}
                    className="h-16 w-16 flex items-center justify-center rounded-full" activeClassName="bg-red-300">
                    {SVG.USER}
                </NavLink>
                <NavLink exact to={ROUTES.LOGIN} onClick={logOut}
                    className="h-16 w-16 flex items-center justify-center rounded-full" activeClassName="bg-red-300">
                    {SVG.SIGNOUT}
                </NavLink>

            </nav>


        </div>
    )
}