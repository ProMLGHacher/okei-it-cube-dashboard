import axios from "axios";

export const $api = axios.create({
    baseURL: 'https://bae5-95-183-22-51.ngrok-free.app/api',
    headers: {
        "ngrok-skip-browser-warning": "6024"
    },
})