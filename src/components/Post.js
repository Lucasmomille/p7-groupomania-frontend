/* eslint-disable */
import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import PostService from "../services/PostService";
import UsersServices from "../services/UsersServices";
import CommentServices from "../services/CommentService";
import PostContext from '../context/postContext';
import CommentService from "../services/CommentService";
import UserContext from '../context/userContext';
import isLiked from '../hooks/isLiked';
import * as SVG from "../constants/svg";

export default function Post() {

    const { posts, setPost } = useContext(PostContext);
    const [message, setMessage] = useState();
    const [postId, setPostId] = useState();
    const { userToken, setUserToken } = useContext(UserContext);
    const [admin, setAdmin] = useState(false)
    const [like, setLike] = useState(0);
    const [user, setUser] = useState();
    const [isLiked, setIsLiked] = useState(false);

    // const { isUserLiked } = isLiked();

    const incrementCounter = () => {
        if (like === 0) {
            /// and if user.id / req.id != like userId
            setLike(like + 1)
        } else {
            setLike(0)
        }
    };

    const updateLike = async (e, postid) => {
        e.preventDefault();

        let data = {
            "postId": postid,
            //"userId": user.users.id
        };
        // if user.users.id === posts.likes.userId
        // delete like

        await PostService.createLike(userToken, data)
            .then(response => {
                console.log("like update ", response)
                //console.log(post);

            })
            .catch(e => {
                console.log(e)
            })
    }

    const test = (id) => {

        for (const post of posts) {
            if (post.id === id) {
                console.log("ok");
                //console.log(post.likes)
                let likes = post.likes;
                let data = {
                    postId: post.id
                }
                //console.log(likes.length)
                let index = likes.findIndex(elt => elt.userId === user.users.id);
                console.log(index)
                if (index === -1) {
                    console.log("empty or not liked")
                    PostService.createLike(userToken, data)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(err => {
                            console.log(err);
                        }
                        )
                } else {
                    console.log("is already liked")
                    for (const like of likes) {

                        if (like.userId === user.users.id) {
                            console.log("likeid", like.id)
                            PostService.deleteLike(userToken, like.id, post.id)
                                .then(response => {
                                    console.log(response);
                                })
                                .catch(err => {
                                    console.log(err);
                                }
                                )
                        }
                    }
                }
                /* if (likes.length === 0) {
                    console.log("empty")
                    // create Like
                    PostService.createLike(userToken, data)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(err => {
                            console.log(err);
                        }
                        )
                    setIsLiked(false)
                } else if (likes.length > 1) {
                    console.log("more than 1")
                } else if (likes.length === 1) {
                    for (const like of likes) {
                        console.log(like)
                        if (like.userId === user.users.id) {
                            console.log("is already liked")
                            setIsLiked(true)
                            PostService.deleteLike(userToken, like.id, post.id)
                                .then(response => {
                                    console.log(response);
                                })
                                .catch(err => {
                                    console.log(err);
                                }
                                )
                        } else {
                            console.log("it's not")
                            setIsLiked(false)

                            PostService.createLike(userToken, data)
                                .then(response => {
                                    console.log(response);
                                })
                                .catch(err => {
                                    console.log(err);
                                }
                                )
                        }

                    }
                } */

                // console.log(user.users.id)

            }
        }
    }

    const submitComment = async (e, id) => {
        e.preventDefault();
        let info = {
            "message": message,
            "postId": postId,
        }
        console.log("before")
        await CommentServices.create(userToken, info)
            .then(response => {
                let newComment = response.data;
                let commentsArray;
                for (const post of posts) {
                    if (post.id === postId) {
                        commentsArray = post.comments;
                        commentsArray.push(newComment);

                        let lastComment = commentsArray[commentsArray.length - 1];
                        let newCommentArray = Object.assign(lastComment, user);
                    }
                }
                let newPosts = [...posts];
                setPost(newPosts);
            })
            .catch(err => {
                console.log(err);
            }
            )
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

    const eraseComment = (commentId) => {
        CommentService.deleteComment(userToken, commentId)
            .then(response => {
                console.log("deleted", response)
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
            });

        await UsersServices.getUser(userToken)
            .then(response => {
                let userData = {
                    "users": response.data
                }
                //console.log(userData.users.id)
                setUser(userData)
            })
            .catch(e => {
                console.log(e)
            });


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
                            <p className="p-4 py-0 font-bold mb-2">{post.likes.length} likes</p>
                            <button className="rounded-md bg-red-300 p-2" onClick={incrementCounter}>+1</button>
                            <p>{like}</p>
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="p-4 pt-1 pb-4 w-full text-left relative">
                                    <p className="mb-1 " >
                                        <a className="mr-1 font-bold">{comment.users.firstname}</a>
                                        <span>{comment.message}</span>
                                    </p>
                                    <button className="absolute top-0 right-0 text-black hover:bg-red-500 rounded-full" onClick={() => eraseComment(comment.id)}>
                                        {SVG.DELETE}
                                    </button>
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
                                        onChange={(e) => setMessage(e.target.value)}
                                        onFocus={() => setPostId(post.id)}
                                    />
                                    <button
                                        className={`text-sm font-bold text-primary`}
                                        type="button"
                                        onClick={submitComment}
                                    >
                                        Post
                                    </button>
                                </form>
                                <button onClick={() => test(post.id)}>test</button>
                                {isLiked ? (
                                    <p>yes</p>
                                ) : (
                                    <p>no</p>
                                )}

                            </div>
                        </div>
                    </div>
                ))
            )
            }
        </Fragment>
    )
}

/* onClick={(e) => updateLike(e, post.id)
{post.comments.map((comment) => (
    -> <Comment prop = comment> </Comment>
    */