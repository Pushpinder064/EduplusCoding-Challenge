import { useState } from "react";
import { registerUser, registerAdmin, registerStoreOwner } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import "./Register.css"

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
    try {
      if (form.role === "ADMIN") {
        // Do NOT send role in payload
        const { name, email, password, address } = form;
        await registerAdmin({ name, email, password, address });
        alert("Admin registered!");
      } else if (form.role === "STORE_OWNER") {
        // Do NOT send role in payload
        const { name, email, password, address } = form;
        await registerStoreOwner({ name, email, password, address });
        alert("Store Owner registered!");
      } else {
        // For USER only, role can be sent or omitted (backend defaults to USER)
        const { name, email, password, address } = form;
        await registerUser({ name, email, password, address });
        alert("User registered!");
      }
      navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
   <form className="register-form" onSubmit={handleSubmit}>
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
