/* eslint-disable */
import React, { useEffect } from "react";
import Sidebar from '../components/Sidebar';

export default function Profile() {
    useEffect(() => {
        document.title = 'Groupomania Profile';

    }, []);
    return (
        <main className="w-full flex">
            <Sidebar></Sidebar>
            <div className="w-8/12 mx-auto p-12">
                <p className="text-2xl mb-12">Bonjour !</p>
                <form className="bg-red-100 p-12 flex flex-col space-y-6">

                    <p>Prénom:</p>
                    <input type="text" className="w-6/12" />
                    <button className="w-min rounded-full bg-red-200 p-2"> Modifier</button>
                </form>
            </div>

        </main>
    )
}