/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import PostService from "../services/PostService";
import UserContext from '../context/userContext';


export default function Dashboard() {
    const [posts, setPost] = useState([]);
    const [comments, setComments] = useState([]);

    const { userToken, setUserToken } = useContext(UserContext);


    const createPost = () => {

    }

    const getPost = () => {
        console.log("user token " + userToken);
        let token = userToken;
        PostService.getAll(token)
            .then(response => {
                setPost(response.data)
                setComments(response.data.comments)
            })
            .catch(e => {
                console.log(e)
            })
    }


    return (
        <main className="flex w-full">
            <div className="bg-gray-50 mx-auto px-12 lg:text-left text-center w-7/12 mt-16 pt-10 flex flex-col">
                <form className="flex flex-col space-y-6 bg-blue-100 w-9/12">
                    <label>Titre du post</label>
                    <input type="text" id="titlePost" />
                    <label>Image</label>

                    <input type="file" capture="user" accept="image/^" id="titlePost" />
                </form>
                <div className="flex flex-col">
                    <button onClick={getPost}>Test</button>
                </div>
                {posts.map((post) => (
                    <div key={post.id} className="flex flex-col items-center ">
                        <img src={post.imageUrl} alt="" className="w-9/12 rounded-md" />
                        <p>{post.likes}</p>
                        <p className="bg-gray-200">{post.title}</p>



                    </div>

                ))}
                {console.log(comments)}
            </div>
        </main>
    )
}