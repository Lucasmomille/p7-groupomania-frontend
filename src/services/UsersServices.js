/* eslint-disable */
import axios from 'axios'

const isUser = (token) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "multipart/form-data",
            'x-access-token': `${token}`
        }

    }
    ).get("/users/user");
    // return http.get("/posts/all")
};

const isAdmin = (token) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "multipart/form-data",
            'x-access-token': `${token}`
        }

    }
    ).get("/users/admin");
    // return http.get("/posts/all")
};

export default {
    isUser,
    isAdmin
};