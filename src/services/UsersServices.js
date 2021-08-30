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
};

const updateUser = (token, data) => {
    console.log(token)
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "application/json",
            'x-access-token': `${token}`
        }
    }
    ).put("/users", data);
};

const getUser = (token) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "multipart/form-data",
            'x-access-token': `${token}`
        }
    }
    ).get("/users");
};

const deleteUser = (token, id) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "multipart/form-data",
            'x-access-token': `${token}`
        }
    }
    ).delete(`/users/${id}`);
};

export default {
    isUser,
    isAdmin,
    updateUser,
    getUser,
    deleteUser
};