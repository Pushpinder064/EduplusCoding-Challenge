import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:4000/api" });

export const getUsers = (params = {}, token) =>
  API.get("/admin/users", { params, headers: { Authorization: `Bearer ${token}` } });

export const createUser = (data, token) =>
  API.post("/admin/users", data, { headers: { Authorization: `Bearer ${token}` } });
