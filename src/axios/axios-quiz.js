import axios from 'axios';

export default axios.create({
    baseURL: 'https://reactquiz-6da03.firebaseio.com/'
})