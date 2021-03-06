/* eslint-disable */
import axios from 'axios'

const getAll = (token) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "application/json",
            'x-access-token': `${token}`
        }
    }
    ).get("/posts/all");
};

const create = (token, data) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "multipart/form-data",
            'x-access-token': `${token}`
        },
    }
    ).post("/posts", data);
};

const createLike = (token, data) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "application/json",
            'x-access-token': `${token}`
        },
    }
    ).post("/posts/likes", data);
};

const deleteLike = (token, id, data) => {
    return axios.delete(`http://localhost:3000/api/posts/likes/${id}`, {
        headers: {
            "Content-type": "application/json",
            'x-access-token': `${token}`
        },
        data: { postId: data }
    });
};

const updateLike = (token, data) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "application/json",
            'x-access-token': `${token}`
        },
    }
    ).post(`/posts/likes/two`, data);
};

const deletePost = (token, id) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "application/json",
            'x-access-token': `${token}`
        },
    }
    ).delete(`/posts/${id}`);
};

export default {
    create,
    getAll,
    deletePost,
    createLike,
    deleteLike

};