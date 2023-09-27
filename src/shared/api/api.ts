import axios from "axios";

export const $api = axios.create({
    baseURL: 'https://3e24-176-28-64-201.ngrok-free.app/api',
    headers: {
        "ngrok-skip-browser-warning": "6024"
    },
})