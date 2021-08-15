/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import PostService from "../services/PostService";
import UsersServices from "../services/UsersServices";
import CommentServices from "../services/CommentService";
import PostContext from '../context/postContext';
import UserContext from '../context/userContext';
import UserInfoContext from '../context/userInfoContext';
import Comment from "../components/Comment";
import * as SVG from "../constants/svg";

export default function Post(props) {
    const post = props.post;

    const { posts, setPost } = useContext(PostContext);
    const [message, setMessage] = useState();
    const [postId, setPostId] = useState();
    const { userToken } = useContext(UserContext);
    const { user, setUser } = useContext(UserInfoContext);
    const [admin, setAdmin] = useState(false)
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = (id) => {

        let likes = post.likes;
        let index = likes.findIndex(elt => elt.userId === user.users.id);

        if (post.id === id) {
            let likes = post.likes;
            let data = {
                postId: post.id
            }
            if (index === -1) {
                console.log("empty or not liked")
                if (!isLiked) {
                    PostService.createLike(userToken, data)
                        .then(response => {
                            let newLike = response.data;
                            setIsLiked(true);
                            //Refresh posts with likes array 
                            likes.unshift(newLike);
                            let lastLike = likes[likes.length - 1];
                            let newLikesArray = Object.assign(lastLike, user);
                            let newPosts = [...posts];
                            setPost(newPosts);

                        })
                        .catch(err => {
                            console.log(err);
                        }
                        )
                }

            } else {
                console.log("is already liked")
                const myLike = likes[index].id;
                if (isLiked) {
                    PostService.deleteLike(userToken, myLike, post.id)
                        .then(response => {
                            likes.splice(index, 1);
                            let newPosts = [...posts];
                            setPost(newPosts);
                            setIsLiked(false)
                        })
                        .catch(err => {
                            console.log(err);
                        }
                        )
                }

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
        PostService.deletePost(userToken, postId)
            .then(response => {
                console.log("post deleted " + response)
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
                setAdmin(true)
            })
            .catch(e => {

                setAdmin(false)
            });
    }, []);

    useEffect(() => {
        let likes = post.likes;
        let userId = JSON.parse(sessionStorage.getItem("idUser"))
        let index = likes.findIndex(elt => elt.userId === userId);
        if (index > -1) {
            setIsLiked(true)
        }
    }, [])


    return (
        <div className="flex flex-col items-center text-left mb-16 relative rounded-md">
            <img src={post.imageUrl} alt={post.title} className="lg:w-9/12 w-11/12 rounded-t-md" />
            {admin ? (
                <button className="absolute text-white hover:bg-black rounded-full" onClick={() => erasePost(post.id)}>
                    {SVG.DELETE}
                </button>
            ) : null}

            <div className="lg:w-9/12 w-11/12 border-gray-400 shadow-md bg-white">
                <p className="p-4 pt-2 pb-1 w-full md:text-base text-sm">
                    <span className="mr-1 font-bold">{post.users.firstname + ' ' + post.users.lastname}</span>
                    <span className=" italic lg:text-xl">{post.title}</span>
                </p>
                <div className="flex mb-2 md:text-base text-sm items-center">
                    <p className="p-4 py-0 font-bold mb-2">{post.likes.length} likes</p>
                    <svg
                        aria-label={`Cliquer ici pour ${isLiked ? "ne plus aimer" : "aimer"}`}
                        onClick={() => toggleLike(post.id)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                () => toggleLike(post.id);
                            }
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                        className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${isLiked ? 'fill-current text-red-500' : 'text-gray-700'
                            }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </div>

                {post.comments.map((comment) => (
                    <Comment comment={comment} post={post} key={comment.id} />
                ))}
                <div className="border-t border-gray-300">
                    <form className="flex justify-between pl-0 pr-5"
                        method="POST"
                    >
                        <input
                            aria-label="Ajouter un commentaire"
                            autoComplete="off"
                            className="text-sm text-gray-500 w-full mr-3 py-5 px-4"
                            type="text"
                            name="add-comment"
                            placeholder="Ajouter un commentaire..."
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setPostId(post.id)}
                        />
                        <button
                            className={`text-sm font-bold text-primary`}
                            type="button"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    (event) => message.length >= 1 ? submitComment(event) : event.preventDefault;
                                }
                            }}
                            onClick={(event) => message.length >= 1 ? submitComment(event) : event.preventDefault}
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>



    )
}
