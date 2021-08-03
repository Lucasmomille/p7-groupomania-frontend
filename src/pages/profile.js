/* eslint-disable */
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import UsersServices from "../services/UsersServices";
import UserContext from '../context/userContext';
import PostContext from '../context/postContext';
import UserInfoContext from '../context/userInfoContext';
import * as ROUTES from '../constants/routes';

export default function Profile() {

    const history = useHistory();
    const { userToken, setUserToken } = useContext(UserContext);
    const { posts, setPost } = useContext(PostContext);
    const { user, setUser } = useContext(UserInfoContext);
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [changeName, setChangeName] = useState()
    const [changeLastname, setChangeLastname] = useState()


    const onSubmit = async e => {
        e.preventDefault();
        var info = {
            firstname: changeName,
            lastname: changeLastname,
        };
        changeUser(userToken, info);
        setFirstname(changeName);
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

    const deleteUser = (token, id, e) => {
        e.preventDefault();
        UsersServices.deleteUser(token, id)
            .then(response => {
                console.log(response);
                setUserToken(null);
                setPost(null);
                sessionStorage.clear();
                history.push(ROUTES.LOGIN);
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        document.title = 'Groupomania Profile';

        UsersServices.getUser(userToken)
            .then(response => {
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setChangeName(response.data.firstname);
                setChangeLastname(response.data.lastname);
            })
            .catch(e => {
                console.log(e)
            })

    }, []);
    return (
        <main className="w-full flex">
            <Sidebar></Sidebar>
            <div className="w-8/12 mx-auto p-12 flex flex-col">
                <p className="text-2xl mb-12">Bonjour {firstname} !</p>
                <form className="bg-red-100 p-12 flex flex-col space-y-6">

                    <p>Prénom:</p>
                    <input type="text" className="w-6/12" onChange={(e) => setChangeName(e.target.value)} />
                    <p>Nom:</p>
                    <input type="text" className="w-6/12" onChange={(e) => setChangeLastname(e.target.value)} />
                    <button className="w-min rounded-full bg-red-200 p-2" onClick={(e) => onSubmit(e)}> Modifier</button>
                </form>
                <button className="w-min rounded-full bg-primary text-white p-4 self-center mt-12 hover:opacity-80" onClick={(e) => deleteUser(userToken, user.users.id, e)}>Supprimer le compte</button>
            </div>

        </main>
    )
}