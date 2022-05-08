import axios from "axios";

const httpClient = axios.create({ baseURL: process.env.REACT_APP_SERVER_BASE_URL })

httpClient.interceptors.request.use(async function (config) {
    
    const token = await localStorage.getItem("messenger-token");
    config.headers["x-access-token"] = token;  
    return config;
});

httpClient.interceptors.response.use(async function (config) {
    return config;
    },
    (error) => {
        return Promise.reject(error.response.data)
});

export default httpClient;
