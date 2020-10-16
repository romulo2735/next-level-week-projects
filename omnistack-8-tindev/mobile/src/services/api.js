import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:3333' -> Ip Local da Rede
    /**
     * CLI command for OS Android
     * adb reverse tcp:3333 tcp:3333
     */
    baseURL: 'http://localhost:3333'
});

export default api;