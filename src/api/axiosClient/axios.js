import axios from 'axios'
import queryString from 'query-string'

const baseURL = 'https://collegeschedule-production.up.railway.app/'

const axiosClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
});

axiosClient.interceptors.request.use(async config => {
    return {
        ...config,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    
    };
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) return response.data;
    return response;
}, (err) => {
    throw err.response.data;
});

export default axiosClient;