/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import PostService from "../services/PostService";
import UserContext from '../context/userContext';
import Post from "../components/Post";


export default function Dashboard() {
    /* const [posts, setPost] = useState([]);
    const [comments, setComments] = useState([]); */
    const [file, setFile] = useState({ file: "" })
    const [title, setTitle] = useState({ title: "" })
    const [fileName, setFileName] = useState()
    const { userToken, setUserToken } = useContext(UserContext);

    const handleFile = (e) => {
        console.log(e)
        const file = e.target.files[0];

        setFileName(file.name);
        console.log(fileName);
        setFile({ file: file })
    }

    const uploadFile = async () => {
        console.log(file.file.name);
        console.log(title);
    }


    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        // formData.append('image', file.file.name);
        formData.append('title', title);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        console.log(file)
        let data = {
            "title": title,
            "image": formData
        }
        await PostService.create(userToken, formData)
            .then(
                console.log('File Uploaded')
            )
            .catch(err => {
                console.log(err);
            }
            );


    };
    useEffect(() => {
        document.title = 'Groupomania';

    }, []);

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