import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://contact-list-2c9e6.firebaseio.com/'
});

export default instance;