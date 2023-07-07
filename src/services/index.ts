import axios from 'axios';
import env from '../configs/environment';

const axiosInstance = axios.create({
    baseURL: env.API_URL
})


axiosInstance.defaults.headers.get['Content-Type'] = 'application/json';

const endpoint = {
    user: 'user'
}

const getUsers = (params: any) => axiosInstance.get(endpoint.user, {params});
const getUsersById = (id: any) => axiosInstance.get(`${endpoint.user}/${id}`);
const postUsers = (data: any) => axiosInstance.post(endpoint.user, data);
const editUsers = (id: any, params: any) => axiosInstance.put(`${endpoint.user}/${id}`, params);
const deleteUsers = (id: any) => axiosInstance.delete(`${endpoint.user}/${id}`);

export {
    axiosInstance,
    getUsers,
    postUsers,
    editUsers,
    deleteUsers,
    getUsersById
}