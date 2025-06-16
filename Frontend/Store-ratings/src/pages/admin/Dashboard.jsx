import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./Dashboard.css";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ userCount: 0, storeCount: 0, ratingCount: 0 });

  useEffect(() => {
    axios.get("http://localhost:4000/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStats(res.data));
  }, [token]);

  return (
   <div className="dashboard-container">
      <h2>Admin Console</h2>
      <p>Total Users: {stats.userCount}</p>
      <p>Total Stores: {stats.storeCount}</p>
      <p>Total Ratings: {stats.ratingCount}</p>
    </div>
  );
}
