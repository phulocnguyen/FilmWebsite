// import axios from "axios";
// import queryString from "query-string";

// const baseURL = "http://localhost:3001/";
// // const baseURL = "https://api.themoviedb.org/3/";
// const publicClient = axios.create({
//     baseURL,
//     paramsSerializer: {
//         encode: params => queryString.stringify(params)
//     }
//     });

//     publicClient.interceptors.request.use(async config => {
//     return {
//         ...config,
//         headers: {
//         "Content-Type": "application/json"
//         }
//     };
//     });

//     publicClient.interceptors.response.use((response) => {
//     if (response && response.data) return response.data;
//     return response;
//     }, (err) => {
//     throw err.response.data;
// });

// export default publicClient;

import axios from 'axios';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request` for the full list of configs
const publicClient = axios.create({
    baseURL:'http://localhost:3001/',
    headers: {
    'content-type': 'application/json',
    },
    });
    publicClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
publicClient.interceptors.response.use((response) => {
    if (response && (response.data || response.data === 0)) {
    return response.data;
    }
    return response;
    }, (error) => {
    // Handle errors
    throw error;
});
export default publicClient;