/* eslint-disable */
import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as ROUTES from '../constants/routes';
import * as SVG from "../constants/svg"
import UserContext from '../context/userContext';
import PostContext from '../context/postContext';

export default function Sidebar() {
    const { setUserToken } = useContext(UserContext);
    const { setPost } = useContext(PostContext);
    const [open, setOpen] = useState(false)

    const logOut = () => {
        setUserToken(null);
        setPost(null);
        sessionStorage.clear();
    }

    return (
        <>
            <div className="fixed z-30 flex lg:w-3/12 w-2/12 bg-primary">
                {SVG.LOGOWHITE}
            </div>
            <button className="mt-14 z-30 fixed lg:hidden bg-primary w-2/12 rounded-b-md py-8" onClick={() => setOpen(!open)} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className={"lg:w-3/12 w-2/12 bg-primary text-white min-h-screen lg:flex flex-col items-center p-4 relative " + (open ? " flex" : " hidden")}>

                <nav className={"space-y-6 flex flex-col mt-32 fixed"}>
                    <NavLink exact to={ROUTES.DASHBOARD}
                        className="lg:h-16 lg:w-16 h-12 w-12 flex items-center justify-center rounded-full" activeClassName="bg-red-300">
                        {SVG.HOME}
                    </NavLink>
                    <NavLink exact to={ROUTES.PROFILE}
                        className="lg:h-16 lg:w-16 h-12 w-12 flex items-center justify-center rounded-full" activeClassName="bg-red-300">
                        {SVG.USER}
                    </NavLink>
                    <NavLink exact to={ROUTES.LOGIN} onClick={logOut}
                        className="lg:h-16 lg:w-16 h-12 w-12 flex items-center justify-center rounded-full" activeClassName="bg-red-300">
                        {SVG.SIGNOUT}
                    </NavLink>

                </nav>


            </div>
        </>
    )
}