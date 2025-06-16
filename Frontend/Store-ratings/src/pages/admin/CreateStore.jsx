import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./CreateStore.css";

export default function CreateStore({ onStoreCreated }) {
  const { token } = useAuth();
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({ name: "", address: "", ownerId: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch all store owners
    axios.get("http://localhost:4000/api/admin/store-owners", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOwners(res.data));
  }, [token]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await axios.post("http://localhost:4000/api/admin/stores", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Store created!");
      setForm({ name: "", address: "", ownerId: "" });
      if (onStoreCreated) onStoreCreated();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create store.");
    }
  };

  return (
  <form className="create-store-form" onSubmit={handleSubmit}>
      <h3>Create Store</h3>
      <input name="name" placeholder="Store Name" value={form.name} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
      <select name="ownerId" value={form.ownerId} onChange={handleChange} required>
        <option value="">Select Store Owner</option>
        {owners.map(o => (
          <option key={o.id} value={o.id}>{o.name} ({o.email})</option>
        ))}
      </select>
      <button type="submit">Create Store</button>
      {error && <span style={{ color: "red" }}>{error}</span>}
      {success && <span style={{ color: "green" }}>{success}</span>}
    </form>
  );
}
