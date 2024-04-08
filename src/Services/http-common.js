import axios from "axios";

export default axios.create({
    // 10.64.10.220
    baseURL: "http://localhost:8082/",
    //baseURL: "http://10.64.10.220:8082/",
    headers:{
        "Content-type": "application/json"
    }
});