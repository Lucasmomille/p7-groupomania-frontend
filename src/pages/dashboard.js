/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import PostService from "../services/PostService";
import UsersServices from "../services/UsersServices";
import UserContext from '../context/userContext';
import PostContext from '../context/postContext';
import Post from "../components/Post";


export default function Dashboard() {
    /* const [posts, setPost] = useState([]);
    const [comments, setComments] = useState([]); */

    const [file, setFile] = useState({ file: "" })
    const { posts, setPost } = useContext(PostContext);
    const [title, setTitle] = useState({ title: "" })
    const [fileName, setFileName] = useState()
    const { userToken, setUserToken } = useContext(UserContext);
    //const { posts, setPost } = useContext(PostContext)

    const wait = function (duration = 1000) {
        return new Promise((resolve) => {
            window.setTimeout(resolve, duration)
        })
    }

    const handleFile = (e) => {
        console.log(e)
        const file = e.target.files[0];

        setFileName(file.name);
        //console.log(fileName);
        setFile({ file: file })
    }

    const uploadFile = async () => {
        console.log(file.file.name);
        console.log(title);
    }


    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file.file);
        formData.append('title', title);
        console.log(file)
        await PostService.create(userToken, formData)
            .then(response => {
                console.log('File Uploaded', response)
                setFileName();
                setTitle();
                /* let newPosts = response.data;
                let oldPosts = [...posts]
                console.log("new create", response.data);
                oldPosts.push(newPosts);
                setPost(oldPosts);
 */
            }
            )
            .catch(err => {
                console.log(err);
            }
            );
    };

    useEffect(() => {
        document.title = 'Groupomania';
    }, []);

    useEffect(() => {
        PostService.getAll(userToken)
            .then(response => {
                if (response.data.length === 0) {
                    console.log("vide");
                } else {
                    let postNotRecent = response.data;
                    const postRecent = postNotRecent.reverse();
                    /* for (const post of postRecent) {
                        let commentRecent = post.comments.reverse();
                        post.comments = commentRecent;
                        console.log(post.comments)
                    } */
                    setPost(postRecent)
                    console.log("rerender get all");
                }

            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <main className="flex w-full">
            <Sidebar></Sidebar>
            <div className="bg-gray-50 mx-auto px-12 lg:text-left text-center w-7/12 mt-16 pt-10 flex flex-col rounded-md">

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
                {/* <button onClick={() => uploadFile()}>Charge</button> */}

                <Post />

            </div>
        </main>
    )
}