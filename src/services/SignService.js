import http from "../http-common";
import axios from 'axios'
/* eslint-disable */

//create user
const create = data => {
    return http.post("/auth/signup", data)
    /* .catch((err) => {
        console.log("axios err : " + err);
        if (err.response) {
            console.log("axios response data " + err.response.data);
            console.log("axios response status " + err.response.status);
            console.log("axios response headers " + err.response.headers);
        }
    }); */
};

const getAll = () => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-type": "multipart/form-data",
            'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI1NDg3ODQ4LCJleHAiOjE2MjU1NzQyNDh9._iF9KQDSJnAPVHyKLo2fMoaWiXdtRtA8WaX23i-Hf1Y`
        }

    }
    ).get("/posts/all");
    // return http.get("/posts/all")
};

const signin = data => {
    return http.post("/auth/signin", data)
};

const signout = data => {
    return http.post("/auth/sign_out", data);
}



/* eslint-disable */
export default {
    create,
    getAll,
    signin,
    signout,
};
