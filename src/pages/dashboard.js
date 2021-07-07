/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import PostService from "../services/PostService";
import UserContext from '../context/userContext';


export default function Dashboard() {
    const [posts, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [file, setFile] = useState({ file: null })
    const { userToken, setUserToken } = useContext(UserContext);

    const handleFile = (e) => {
        console.log(e)
        let file = e.target.files[0];
        setFile({ file: file })
    }

    const uploadFile = async () => {

        console.log(file)
    }

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
    /* useEffect(() => {
        document.title = 'Groupomania';

    }, []); */

    return (
        <main className="flex w-full">
            <div className="bg-gray-50 mx-auto px-12 lg:text-left text-center w-7/12 mt-16 pt-10 flex flex-col">
                <form className="flex flex-col space-y-6 bg-blue-100 w-9/12">
                    <label>Titre du post</label>
                    <input type="text" id="titlePost" />
                    <label>Image</label>

                    <input type="file" capture="user" accept="image/^" id="titlePost" onChange={(e) => handleFile(e)} />

                </form>
                <button onClick={() => uploadFile()}>Upload</button>
                <div className="flex flex-col">
                    <button onClick={getPost}>Test</button>
                </div>
                {posts.map((post) => (
                    <div key={post.id} className="flex flex-col items-center text-left ">
                        <img src={post.imageUrl} alt="" className="w-9/12 rounded-md" />
                        <p className="p-4 pt-2 pb-1 w-full">
                            <span className="w-9/12">{post.userId}</span>
                            <span className=" w-9/12 italic text-xl">{post.title}</span>
                        </p>
                        <span className="w-9/12">{post.likes}</span>
                        {console.log(post.comments)}
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="p-4 pt-1 pb-4 w-9/12 text-left">
                                <p className="mb-1" >
                                    <a className="mr-6 font-bold">{comment.userId}</a>
                                    <span>{comment.message}</span>
                                </p>
                            </div>
                        ))}
                    </div>

                ))
                }

            </div >
        </main >
    )
}