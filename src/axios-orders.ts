import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-14162.firebaseio.com/',
});

export default instance;