/* eslint-disable */
import axios from 'axios'

const create = (token, data) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "application/json",
            'x-access-token': `${token}`
        },
    }
    ).post("/comments", data);
};

const deleteComment = (token, id) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "application/json",
            'x-access-token': `${token}`
        },
    }
    ).delete(`/comments/${id}`);
};

export default {
    create,
    deleteComment
};