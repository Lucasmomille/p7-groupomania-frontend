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
    // return http.get("/posts/all")
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
    // return http.get("/posts/all")
};

export default {
    create,
    deleteComment
};