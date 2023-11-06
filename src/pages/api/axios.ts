import axios from 'axios';

export default axios.create({
  baseURL: 'https://petjournal-api.onrender.com/api',
});