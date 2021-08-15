/* eslint-disable */
import React, { useState, useContext, useEffect, Fragment } from "react";
import UsersServices from "../services/UsersServices";
import CommentService from "../services/CommentService";
import UserContext from '../context/userContext';
import PostContext from '../context/postContext';
import UserInfoContext from '../context/userInfoContext';
import * as SVG from "../constants/svg";

export default function Comment(props) {
    const comment = props.comment;
    const post = props.post;
    const { userToken } = useContext(UserContext);
    const { posts, setPost } = useContext(PostContext);
    const { user } = useContext(UserInfoContext);
    const [admin, setAdmin] = useState(false)

    const eraseComment = (commentId) => {
        CommentService.deleteComment(userToken, commentId)
            .then(response => {
                let commentsArray = post.comments;
                let index = commentsArray.findIndex(elt => elt.userId === user.users.id);
                commentsArray.splice(index, 1);
                let newPosts = [...posts];
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

    return (
        <Fragment>
            <div key={comment.id} className="p-4 pt-1 pb-4 w-full text-left relative">
                <p className="mb-1 md:text-base text-sm" >
                    <a className="mr-1 font-bold">{comment.users.firstname}</a>
                    <span>{comment.message}</span>
                </p>
                {admin ? (
                    <button className="absolute top-0 right-0 text-black hover:bg-red-500 rounded-full" onClick={() => eraseComment(comment.id)}>
                        {SVG.DELETE}
                    </button>
                ) : null}

            </div>
        </Fragment>
    )
}