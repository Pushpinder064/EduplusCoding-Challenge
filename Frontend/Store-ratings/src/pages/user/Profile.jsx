import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./Profile.css";

export default function Profile() {
  const { user, token } = useAuth();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");
    try {
      await axios.put("http://localhost:4000/api/user/password", { password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Password updated successfully!");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update password.");
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>

      <h3>Update Password</h3>
      <form onSubmit={handlePasswordUpdate}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
