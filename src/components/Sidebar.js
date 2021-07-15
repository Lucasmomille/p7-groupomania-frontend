/* eslint-disable */
import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as ROUTES from '../constants/routes';
import * as SVG from "../constants/svg"


export default function Sidebar() {
    // route pour logout
    // clear local storage
    const logOut = () => {
        sessionStorage.clear();
    }
    return (
        <div className="w-3/12  bg-primary text-white min-h-screen p-4 relative ">
            <div className="fixed">
                {SVG.LOGOWHITE}
                <nav className="space-y-6 w-full items-center flex flex-col mt-12">
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

        </div>
    )
}