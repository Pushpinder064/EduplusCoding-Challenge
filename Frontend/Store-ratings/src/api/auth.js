import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:4000/api" });

// registration endpoints 
export const registerUser = (data) => API.post("/auth/register", data);
export const registerAdmin = (data) => API.post("/auth/register-admin", data);
export const registerStoreOwner = (data) => API.post("/auth/register-store-owner", data);

// Login endpoints
export const loginUser = (data) => API.post("/auth/login", data);
export const loginAdmin = (data) => API.post("/auth/login-admin", data);
export const loginStoreOwner = (data) => API.post("/auth/login-store-owner", data);
