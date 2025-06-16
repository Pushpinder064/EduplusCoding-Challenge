import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./AddUser.css";

export default function AddUser({ onUserAdded }) {
  const { token } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "", role: "USER" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await axios.post("http://localhost:4000/api/admin/users", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("User created!");
      setForm({ name: "", email: "", password: "", address: "", role: "USER" });
      if (onUserAdded) onUserAdded();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create user.");
    }
  };

  return (
   <form className="add-user-form" onSubmit={handleSubmit}>
      <h3>Add User</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <select name="role" value={form.role} onChange={handleChange} required>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="STORE_OWNER">Store Owner</option>
      </select>
      <button type="submit">Add User</button>
      {error && <span style={{ color: "red" }}>{error}</span>}
      {success && <span style={{ color: "green" }}>{success}</span>}
    </form>
  );
}
