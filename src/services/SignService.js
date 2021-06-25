import http from "../http-common";
/* eslint-disable */
/* const getAll = () => {
    return http.get("/users");
};

const get = id => {
    return http.get(`/users/${id}`);
}; */

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

// delete user
const remove = data => {
    return http.delete("/auth", data);
};

/* const removeAll = () => {
    return http.delete(`/users`);
}; */



/* eslint-disable */
export default {
    create,
    // update,
    remove,
    signin,
    signout,
};
