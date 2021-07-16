/* eslint-disable */
import React, { useEffect, useContext, useState } from "react";
import Sidebar from '../components/Sidebar';
import UsersServices from "../services/UsersServices";
import UserContext from '../context/userContext';


export default function Profile() {

    const { userToken, setUserToken } = useContext(UserContext);
    const [firstname, setFirstname] = useState(null)
    const [changeName, setChangeName] = useState(null)


    const onSubmit = async e => {
        e.preventDefault();
        var info = {
            firstname: changeName
        };
        console.log(info)
        changeUser(userToken, info)
    }


    const changeUser = (token, data) => {
        UsersServices.updateUser(token, data)
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        document.title = 'Groupomania Profile';

        UsersServices.getUser(userToken)
            .then(response => {
                console.log(response)
                setFirstname(response.data.firstname)
            })
            .catch(e => {
                console.log(e)
            })

    }, []);
    return (
        <main className="w-full flex">
            <Sidebar></Sidebar>
            <div className="w-8/12 mx-auto p-12">
                <p className="text-2xl mb-12">Bonjour {firstname} !</p>
                <form className="bg-red-100 p-12 flex flex-col space-y-6">

                    <p>Prénom:</p>
                    <input type="text" className="w-6/12" onChange={(e) => setChangeName(e.target.value)} />
                    <button className="w-min rounded-full bg-red-200 p-2" onClick={(e) => onSubmit(e)}> Modifier</button>
                </form>
            </div>

        </main>
    )
}