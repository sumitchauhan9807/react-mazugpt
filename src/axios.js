import axios from 'axios';
import {baseUrl} from './helpers'
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';


let userData = localStorage.getItem('persist:root')
if(userData) {
    userData = JSON.parse(userData)
    let user = JSON.parse(userData.user)
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    console.log(user)
}
axios.interceptors.request.use(request => {
    // console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

const setAxiosToken = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export default axios
export {
  setAxiosToken
}