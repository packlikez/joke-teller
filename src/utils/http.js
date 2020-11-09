import axios from "axios";

const instance = axios.create({baseURL: "http://api.icndb.com"});

instance.interceptors.response.use(null, function (error) {
    return {error};
});

const http = {
    get: instance.get,
};

export default http;
