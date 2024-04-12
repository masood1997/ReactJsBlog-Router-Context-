import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:2000/api/v1",
    headers:{
        'Content-type' : "application/json"
    },
    withCredentials:true
});

export const apiPrivate = axios.create({
    baseURL:"http://localhost:2000/api/v1",
    headers:{
        'Content-type' : "application/json"
    },
    withCredentials:true
});

export default api;