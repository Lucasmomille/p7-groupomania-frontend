/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import SignService from "../services/SignService";


export default function Dashboard() {
    const [posts, setPost] = useState([])
    const getPost = () => {
        SignService.getAll()
            .then(response => {
                setPost(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }


    return (
        <main className="flex w-full">
            <div className="bg-gray-50 px-12 lg:text-left text-center w-7/12 mt-16 pt-10 flex flex-col">
                <div className="flex flex-col">
                    <button onClick={getPost}>Test</button>
                </div>
                {posts.map((post) => (
                    <div key={post.id} className="flex flex-col">
                        <img src={post.imageUrl} alt="" />
                        <p className="bg-gray-200">{post.title}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}