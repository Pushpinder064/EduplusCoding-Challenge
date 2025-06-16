import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:4000/api" });

export const getStores = (params = {}, token) =>
  API.get("/admin/stores", { params, headers: { Authorization: `Bearer ${token}` } });

export const createStore = (data, token) =>
  API.post("/store/create", data, { headers: { Authorization: `Bearer ${token}` } });

export const getMyStores = (token) =>
  API.get("/store/my", { headers: { Authorization: `Bearer ${token}` } });
