import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import CreateStore from "./CreateStore"; // <-- Import the CreateStore form
import "./Stores.css";

export default function Stores() {
  const { token } = useAuth();
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "" });

  const fetchStores = () => {
    axios.get("http://localhost:4000/api/admin/stores", {
      params: filters,
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStores(res.data));
  };

  useEffect(() => { fetchStores(); }, [token]);

  const handleChange = e => setFilters(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
     <div className="stores-admin-container">
     
      <CreateStore onStoreCreated={fetchStores} /> {/* <-- Add this line */}

      <div><h3>Search stores</h3></div>
      <div className="stores-filter-bar">
        <input name="name" placeholder="Name" value={filters.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={filters.email} onChange={handleChange} />
        <input name="address" placeholder="Address" value={filters.address} onChange={handleChange} />
        <button onClick={fetchStores}>Apply Filters</button>
      </div>
     <ul className="stores-list">
      <h3>All stores:</h3>
        {stores.map(s => (
          <li key={s.id}>
            {s.name} - {s.address} (Owner: {s.email}) (Rating: {s.rating ?? "N/A"})
          </li>
        ))}
      </ul>
    </div>
  );
}

