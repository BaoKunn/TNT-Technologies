import axios from "axios";

window.axios = axios
axios.defaults.baseURL='https://farmapidev.tnt-tech.vn/api'
axios.interceptors.request.use(function(config) {
    config.headers.common = {
        Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        "Content-Type": "application/json",
        Accept: "application/json"
    }
    return config;
}) 