import axios from "axios";


let config = {
    baseURL: process.env.baseURL || process.env.apiUrl || 'http://localhost:8000'
    // timeout: 600 * 1000, // Timeout
    //withCredentials: true, // Check cross-site Access-Control
  };
const _axios = axios.create(config); 

export default _axios
