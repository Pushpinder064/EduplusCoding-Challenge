import { useState } from "react";
import useAuth from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginRes = await axios.post("http://localhost:4000/api/auth/login", form);
      const token = loginRes.data.token;
      const userObj = loginRes.data.user;
      login(token, userObj);

      // Redirect based on role
      const role = userObj.role;
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "STORE_OWNER") navigate("/store-owner/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
