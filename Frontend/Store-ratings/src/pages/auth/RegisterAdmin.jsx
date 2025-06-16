import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let endpoint = "/auth/register";
    if (form.role === "ADMIN") endpoint = "/auth/register-admin";
    else if (form.role === "STORE_OWNER") endpoint = "/auth/register-store-owner";

    try {
      // Don't send role in the payload for admin/store owner
      const payload = { ...form };
      if (form.role !== "USER") delete payload.role;
      await axios.post(`http://localhost:4000/api${endpoint}`, payload);
      alert(`${form.role} registered!`);
      if (form.role === "ADMIN") navigate("/auth/login");
      else if (form.role === "STORE_OWNER") navigate("/auth/login");
      else navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="USER">User</option>
        <option value="STORE_OWNER">Store Owner</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button type="submit">Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
