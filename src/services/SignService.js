import http from "../http-common";
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

const signin = data => {
    return http.post("/auth/signin", data)
};

const signout = data => {
    return http.post("/auth/sign_out", data);
}



/* eslint-disable */
export default {
    create,
    signin,
    signout,
};
