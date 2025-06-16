import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function RateStore({ storeId, onRated }) {
  const { token } = useAuth();
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");
    try {
      await axios.post("http://localhost:4000/api/user/rate", { storeId, rating }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Rating submitted!");
      if (onRated) onRated(storeId, rating);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit rating.");
    }
  };

  if (message) return <span style={{ color: "green" }}>{message}</span>;

  return (
    <form onSubmit={handleSubmit} style={{ display: "inline-block", marginLeft: "1em" }}>
      <select value={rating} onChange={e => setRating(Number(e.target.value))}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <button type="submit">Rate</button>
      {error && <span style={{ color: "red", marginLeft: 8 }}>{error}</span>}
    </form>
  );
}
