/* eslint-disable */
import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import PostService from "../services/PostService";
import UsersServices from "../services/UsersServices";
import PostContext from '../context/postContext';

import UserContext from '../context/userContext';
import * as SVG from "../constants/svg";

export default function Post() {

    const { posts, setPost } = useContext(PostContext);
    //const [comments, setComments] = useState([]);
    const { userToken, setUserToken } = useContext(UserContext);
    const [admin, setAdmin] = useState(false)


    const wait = function (duration = 1000) {
        return new Promise((resolve) => {
            window.setTimeout(resolve, duration)
        })
    }

    const erasePost = (postId) => {
        //console.log(posts[0].id);
        PostService.deletePost(userToken, postId)
            .then(response => {
                console.log("post deleted " + response)
                //console.log(post);
                let newPosts = [...posts];
                console.log("new", newPosts)
                let index = newPosts.findIndex(elt => elt.id === postId);
                newPosts.splice(index, 1);
                setPost(newPosts);
            })
            .catch(e => {
                console.log(e)
            })
    }



    useEffect(async () => {
        await UsersServices.isAdmin(userToken)
            .then(response => {
                // console.log(response)
                setAdmin(true)
            })
            .catch(e => {
                // console.log(e)
                setAdmin(false)
            })

    }, []);

    return (
        <Fragment>
            {!posts || posts.length === 0 ? (
                <div className="text-bold bg-red-400 text-white p-2">Pas de post encore :( </div>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="flex flex-col items-center text-left mb-16 relative rounded-md">
                        <img src={post.imageUrl} alt={post.title} className="w-9/12 rounded-t-md" />
                        {admin ? (
                            <button className="absolute text-white hover:bg-black rounded-full" onClick={() => erasePost(post.id)}>
                                {SVG.DELETE}
                            </button>
                        ) : null}

                        <div className="w-9/12 border-gray-400 shadow-md bg-white">

                            <p className="p-4 pt-2 pb-1 w-full">
                                <span className="mr-1 font-bold">{post.users.firstname + ' ' + post.users.lastname}</span>
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