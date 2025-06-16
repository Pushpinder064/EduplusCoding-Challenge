import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:4000/api" });

export const rateStore = (data, token) =>
  API.post("/user/rate", data, { headers: { Authorization: `Bearer ${token}` } });
