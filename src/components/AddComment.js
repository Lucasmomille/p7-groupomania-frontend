/* eslint-disable */
import React, { useState, useContext } from "react";
import CommentServices from "../services/CommentService";
import UserContext from '../context/userContext';
import PostContext from '../context/postContext';
import UserInfoContext from '../context/userInfoContext';

export default function AddComment(props) {
    const post = props.post;
    const { userToken } = useContext(UserContext);
    const { posts, setPost } = useContext(PostContext);
    const { user } = useContext(UserInfoContext);
    const [message, setMessage] = useState();
    const [postId, setPostId] = useState();

    const submitComment = async (e) => {
        e.preventDefault();
        let info = {
            "message": message,
            "postId": postId,
        }
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

    return (

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
    )
}