/* eslint-disable */
import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import PostService from "../services/PostService";
import UserContext from '../context/userContext';
import * as SVG from "../constants/svg";

export default function Post() {
    const [posts, setPost] = useState(null);
    //const [comments, setComments] = useState([]);
    const { userToken, setUserToken } = useContext(UserContext);

    useEffect(() => {
        let token = userToken;
        PostService.getAll(token)
            .then(response => {
                //console.log(response.data[0].comments);
                if (response.data.length === 0) {
                    console.log("vide")
                } else {
                    console.log("pas vide")
                    setPost(response.data)
                }

                //setComments(response.data[0].comments)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <Fragment>
            {!posts ? (
                <div className="text-bold bg-red-400 text-white p-2">Pas de post encore :( </div>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="flex flex-col items-center text-left mb-16 relative rounded-md">
                        <img src={post.imageUrl} alt={post.title} className="w-9/12 rounded-t-md" />
                        <button className="absolute text-white hover:bg-black rounded-full">
                            {SVG.DELETE}
                        </button>
                        <div className="w-9/12 border-gray-400 shadow-md bg-white">

                            <p className="p-4 pt-2 pb-1 w-full">
                                <span className="mr-1 font-bold">{post.userId}</span>
                                <span className=" italic text-xl">{post.title}</span>
                            </p>
                            <p className="p-4 py-0 font-bold mb-2">{post.likes} likes</p>
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="p-4 pt-1 pb-4 w-full text-left">
                                    <p className="mb-1" >
                                        <a className="mr-1 font-bold">{comment.userId}</a>
                                        <span>{comment.message}</span>
                                    </p>
                                </div>
                            ))}
                            <div className="border-t border-gray-300">
                                <form className="flex justify-between pl-0 pr-5"
                                    method="POST">

                                    <input
                                        aria-label="Add a comment"
                                        autoComplete="off"
                                        className="text-sm text-gray-500 w-full mr-3 py-5 px-4"
                                        type="text"
                                        name="add-comment"
                                        placeholder="Add a comment..."

                                    />
                                    <button
                                        className={`text-sm font-bold text-primary`}
                                        type="button"

                                    >
                                        Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))
            )
            }
        </Fragment>
    )
}