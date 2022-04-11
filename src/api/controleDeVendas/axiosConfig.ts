import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:44314/api'
})

export default api;