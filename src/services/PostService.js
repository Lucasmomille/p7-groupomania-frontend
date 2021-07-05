//import http from "../http-common";
/* eslint-disable */
import axios from 'axios'

const getAll = (token) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "multipart/form-data",
            'x-access-token': `${token}`
        }

    }
    ).get("/posts/all");
    // return http.get("/posts/all")
};

export default {
    //create,
    getAll

};