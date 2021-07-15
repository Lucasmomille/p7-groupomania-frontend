/* eslint-disable */
import { useState, useContext, useEffect } from 'react';
import UserContext from '../context/userContext';
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import SignService from "../services/SignService";
import * as ROUTES from '../constants/routes';
//import UserContext from '../context/user';
import * as SVG from '../constants/svg';

const wait = function (duration = 1000) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, duration)
    })
}

export default function Login() {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    let [isError, setIsError] = useState(false);
    const { userToken, setUserToken } = useContext(UserContext);

    const onSubmit = async data => {
        var info = {
            email: data["email"],
            password: data["password"],
        };
        await wait(2000)
        saveLogin(info);

        history.push(ROUTES.DASHBOARD);

    }

    const saveLogin = (info) => {
        console.log("saveLogin")

        SignService.signin(info)
            .then(response => {

                //setUserToken(response.data.accessToken)
                sessionStorage.setItem("infoUser", JSON.stringify(response.data.accessToken));
                setIsError(false);
                //sessionStorage.clear();
                //localStorage.clear();
            })
            .catch(e => {
                if (e) {
                    console.log(e)
                } else if (e.response.status = 401) {
                    setIsError(true);
                    console.log("is 401 " + isError);
                    return isError;
                } else {
                    setIsError(false);
                }
            });
    };



    useEffect(() => {
        document.title = 'Groupomania - Login';
    }, []);

    return (
        <div className="container flex mx-auto w-11/12 lg:w-9/12 justify-between items-center min-h-screen">
            {SVG.LOGOCOLOR}
            <form onSubmit={handleSubmit(onSubmit)} method="submit" className="w-10/12 lg:w-5/12 mx-auto flex flex-col space-y-4 items-center bg-green-50 p-4 border border-blue-600 mb-4 rounded">
                <h2 className="uppercase text-blue-600 my-5">Sign in to website</h2>
                <div className="flex flex-col text-left">
                    <label className="px-4" htmlFor="email" > Email <span>*</span> </label>
                    <input type="email" id="email" placeholder="Votre adresse mail"
                        className="text-gray-600 border border-blue-600 rounded-xl mt-2 p-4 focus:ring-2 focus:ring-green-700"
                        {...register("email", {
                            required: "Email requis",

                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Ce mail n'est pas valide"
                            },
                        })} />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}

                </div>
                <div className="flex flex-col text-left">
                    <label className="px-4" htmlFor="password" > Mot de passe <span>*</span> </label>
                    <input type="password"
                        id="password"
                        placeholder="TeSt12*456"
                        name="password"

                        className="text-gray-600 border border-blue-600 rounded-xl mt-2 p-4 focus:ring-2 focus:ring-green-700"
                        {...register("password", {
                            required: "mot de passe requis",
                            minLength: {
                                value: 8,
                                message: "8 caractères minimum :)"
                            },

                        })} />
                    {errors.password && <span className="text-red-500 text-xs mt-1 mb-2">{errors.password.message}</span>}
                    {isError && <span className="text-red-500 text-xs mt-1 mb-2">Mot de passe invalide</span>}

                </div>
                <div className="flex text-center items-center w-10/12 mb-5">

                    <button
                        type="submit"
                        className="bg-blue-600 mx-auto text-white hover:bg-transparent hover:text-blue-600 rounded font-bold px-8 py-2">
                        Envoyer
                    </button>
                </div>

            </form>
        </div>
    )
}