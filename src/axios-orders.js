import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://yoururl.firebaseio.com/'
});

export default instance;
