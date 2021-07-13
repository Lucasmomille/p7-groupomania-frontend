/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import PostService from "../services/PostService";
import UserContext from '../context/userContext';
import Post from "../components/Post";

export default function Dashboard() {
    /* const [posts, setPost] = useState([]);
    const [comments, setComments] = useState([]); */
    const [file, setFile] = useState({ file: "" })
    const [title, setTitle] = useState({ title: "" })
    const { userToken, setUserToken } = useContext(UserContext);

    const handleFile = (e) => {
        console.log(e)
        let file = e.target.files[0];
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
            <div className="bg-gray-50 mx-auto px-12 lg:text-left text-center w-7/12 mt-16 pt-10 flex flex-col">
                <form className="flex flex-col mx-auto space-y-6 bg-blue-100 w-9/12 mb-12" onSubmit={onSubmit}>
                    <label>Titre du post</label>
                    <input type="text" id="titlePost" onChange={(e) => setTitle(e.target.value)} className="p-2 mx-auto w-11/12" />
                    <label>Image</label>

                    <input type="file" capture="user" accept="image/^" id="titlePost" onChange={(e) => handleFile(e)} />
                    <input
                        type='submit'
                        value='Upload'
                        className='bg-gray-300 mt-4'
                    />
                </form>
                {/* <button onClick={() => uploadFile()}>Charge</button> */}

                <Post />

            </div>
        </main>
    )
}