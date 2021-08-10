/* eslint-disable */
import React, { useState, useContext, useEffect, Fragment } from "react";
import Sidebar from '../components/Sidebar';
import PostService from "../services/PostService";
import UsersServices from "../services/UsersServices";
import UserContext from '../context/userContext';
import PostContext from '../context/postContext';
import UserInfoContext from '../context/userInfoContext';
import Post from "../components/Post";


export default function Dashboard() {

    const [file, setFile] = useState({ file: "" })
    const { posts, setPost } = useContext(PostContext);
    const [title, setTitle] = useState({ title: "" })
    const [fileName, setFileName] = useState()
    const { userToken, setUserToken } = useContext(UserContext);
    const { user, setUser } = useContext(UserInfoContext);
    const [refreshToSee, setRefreshToSee] = useState(false)

    //console.log("post", user)
    const handleFile = (e) => {
        const file = e.target.files[0];

        setFileName(file.name);
        //console.log(fileName);
        setFile({ file: file })
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file.file);
        formData.append('title', title);
        await PostService.create(userToken, formData)
            .then(response => {
                console.log('File Uploaded', response.data)
                setFileName();
                setTitle();
                let newPosts = response.data;
                if (posts === undefined) {
                    setRefreshToSee(true)
                } else {

                    let postsArray = posts;
                    postsArray.unshift(newPosts);
                    let lastPost = postsArray[0];
                    let likes = {
                        likes: [],
                        comments: [],
                    };
                    let newPostArray = Object.assign(lastPost, user);
                    let newPostLikes = Object.assign(newPostArray, likes);
                    let oldPosts = [...posts];
                    setPost(oldPosts);
                }

            }
            )
            .catch(err => {
                console.log(err);
            }
            );
    };

    useEffect(async () => {
        document.title = 'Groupomania';
        await UsersServices.getUser(userToken)
            .then(response => {
                let userData = {
                    "users": response.data
                }
                setUser(userData)
            })
            .catch(e => {
                console.log(e)
            });

    }, []);

    useEffect(() => {
        PostService.getAll(userToken)
            .then(response => {
                if (response.data.length === 0) {
                    console.log("vide");
                } else {
                    let postNotRecent = response.data;
                    const postRecent = postNotRecent.reverse();
                    setPost(postRecent)
                }

            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <main className="flex w-full">
            <Sidebar></Sidebar>
            <div className="bg-gray-50 mx-auto px-12 lg:text-left text-center lg:w-7/12 w-10/12 mt-16 pt-10 flex flex-col rounded-md">

                <form className="flex flex-col mx-auto space-y-6 bg-red-100 w-9/12 mb-12 p-4 rounded-md" onSubmit={onSubmit}>
                    <label>Titre du post</label>
                    <input type="text" id="titlePost" onChange={(e) => setTitle(e.target.value)}
                        className="p-2 mx-auto w-11/12 rounded-md" />

                    <div className="file-input w-full flex flex-col items-center">
                        <label htmlFor="file">Image...</label>

                        <input type="file" capture="user" accept="image/^"
                            className="file"
                            id="file" onChange={(e) => handleFile(e)} />
                        <p>{fileName}</p>
                    </div>

                    <button
                        type='submit'

                        className='bg-red-300 mt-4 text-white font-bold'
                    > Poster !</button>
                </form>

                {!posts || posts.length === 0 ? (
                    refreshToSee ? (
                        <div className="text-bold"> Actualise pour voir ton post {`;)`} </div>
                    ) : (
                        <div className="text-bold bg-red-400 text-white p-2">Pas de post encore {`:(`} </div>
                    )
                ) : (
                    posts.map((post) => (
                        <Post post={post} key={post.id} />
                    ))
                )
                }

            </div>
        </main>
    )
}