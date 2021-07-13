/* eslint-disable */
import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import PostService from "../services/PostService";
import UserContext from '../context/userContext';


export default function Post() {
    const [posts, setPost] = useState([]);
    //const [comments, setComments] = useState([]);
    const { userToken, setUserToken } = useContext(UserContext);

    const getPost = () => {
        console.log("user token " + userToken);
        let token = userToken;
        PostService.getAll(token)
            .then(response => {
                console.log(response.data[0].comments);
                setPost(response.data)
                //setComments(response.data[0].comments)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <Fragment>
            <div className="flex flex-col">
                <button onClick={getPost}>Test</button>
            </div>
            {
                posts.map((post) => (
                    <div key={post.id} className="flex flex-col items-center text-left mb-16">
                        <img src={post.imageUrl} alt="" className="w-9/12 rounded-t-md " />
                        <div className="w-9/12 border-gray-400 shadow-md bg-white">

                            <p className="p-4 pt-2 pb-1 w-full">
                                <span className="mr-1 font-bold">{post.userId}</span>
                                <span className=" italic text-xl">{post.title}</span>
                            </p>
                            <p className="p-4 py-0 font-bold">{post.likes} likes</p>
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="p-4 pt-1 pb-4 w-full text-left">
                                    <p className="mb-1" >
                                        <a className="mr-1 font-bold">{comment.userId}</a>
                                        <span>{comment.message}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
        </Fragment>
    )
}