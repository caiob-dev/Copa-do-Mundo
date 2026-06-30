import axios from "axios";

export const http = axios.create({
    baseURL: "https://copa-do-mundo-com-java-postgres-spring.onrender.com",
});