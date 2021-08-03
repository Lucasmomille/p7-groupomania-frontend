/* eslint-disable */
import { useEffect, useRef } from 'react';

import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import SignService from "../services/SignService"
import * as ROUTES from '../constants/routes';

const wait = function (duration = 1000) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, duration)
    })
}

export default function SignUp() {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, formState, watch } = useForm();

    const { isSubmitSuccessful } = formState
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async data => {
        console.log('onsubmit')
        var info = {
            lastname: data["lastname"],
            firstname: data["firstname"],
            email: data["email"],
            password: data["password"],
        };
        saveSignUp(info);
        await wait(2000)
        history.push(ROUTES.LOGIN);
    }

    const saveSignUp = (info) => {
        SignService.create(info)
            .then(response => {

                console.log(response.headers);
            })
            .catch(e => {
                console.log(e + " pb savesignup");
            });
    };

    useEffect(() => {
        document.title = 'Groupomania - Inscription';
    }, []);


    return (
        <div className="container flex mx-auto max-w-screen-md items-center min-h-screen">

            <div className="flex flex-col lg:w-3/5 w-4/5 mx-auto">

                <form onSubmit={handleSubmit(onSubmit)} method="submit" className="flex flex-col items-center bg-white p-4 border border-primary mb-4 rounded">
                    <div className="flex flex-col text-left">
                        <label className="px-4" htmlFor="email" > Email <span>*</span> </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Votre adresse mail"
                            name="email"
                            className="text-gray-600  mt-2 p-4 focus:ring-2 focus:ring-blue-200"
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
                        <label className="px-4" htmlFor="firstname" > Prénom <span>*</span> </label>
                        <input type="text"
                            id="firstname"
                            placeholder="Jane"
                            name="firstname"

                            className="text-gray-600  mt-2 p-4 focus:ring-2 focus:ring-blue-200"
                            {...register("firstname", {
                                required: "prénom requis",

                            })} />
                        {errors.firstname && <span className="text-red-500 text-xs mt-1 mb-2">{errors.firstname.message}</span>}

                    </div>
                    <div className="flex flex-col text-left">
                        <label className="px-4" htmlFor="lastname" > Nom <span>*</span> </label>
                        <input type="text"
                            id="lastname"
                            placeholder="Doe"
                            name="lastname"

                            className="text-gray-600  mt-2 p-4 focus:ring-2 focus:ring-blue-200"
                            {...register("lastname", {
                                required: "nom requis",


                            })} />
                        {errors.lastname && <span className="text-red-500 text-xs mt-1 mb-2">{errors.lastname.message}</span>}

                    </div>
                    <div className="flex flex-col text-left">
                        <label className="px-4" htmlFor="password" > Mot de passe <span>*</span> </label>

                        <input
                            type="password"
                            id="password"
                            placeholder="TeSt12*456"
                            name="password"

                            className="text-gray-600  mt-2 p-4 focus:ring-2 focus:ring-blue-200"
                            {...register("password", {
                                required: "Mot de passe requis",
                                minLength: {
                                    value: 8,
                                    message: "8 caractères minimum :)"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                                    message: "Doit contenir au moins une majuscule, une minuscule, un caractère spécial et un chiffre"
                                },

                            })}
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1 mb-2">{errors.password.message}</span>}

                    </div>
                    <div className="flex flex-col text-left">
                        <label className="px-4" htmlFor="password_confirmation" > Mot de passe confirmation <span>*</span> </label>

                        <input
                            type="password"
                            id="password_confirmation"
                            placeholder="TeSt12*456"
                            name="password_confirmation"

                            className="text-gray-600  mt-2 p-4 focus:ring-2 focus:ring-blue-200"
                            {...register("password_confirmation", {
                                validate: (value) =>
                                    value === password.current || "The passwords do not match",
                                minLength: {
                                    value: 8,
                                    message: "8 caractères minimum :)"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                                    message: "Doit contenir au moins une majuscule, une minuscule, un caractère spécial et un chiffre"
                                },
                            })}
                        />
                        {errors.password_confirmation && <span className="text-red-500 text-xs mt-1 mb-2">{errors.password_confirmation.message}</span>}
                    </div>

                    <button

                        type="submit"
                        className="bg-primary text-white rounded px-8 h-8 font-bold">
                        Sign Up
                    </button>
                </form>
                {isSubmitSuccessful && <span className="bg-green-100 text-green-800 rounded-md border-green-800 text-sm p-2 my-auto" >Compte créé !</span>}
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-primary">
                    <p className="text-sm">
                        Tu as un compte ?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-primary">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}