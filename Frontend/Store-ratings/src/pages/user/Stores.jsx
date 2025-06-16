import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import RateStore from "../../components/user/RateStore";
import "./Stores.css";


export default function UserStores() {
  const { token } = useAuth();
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", address: "" });

  const fetchStores = () => {
    axios.get("http://localhost:4000/api/user/stores", {
      params: filters,
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStores(res.data));
  };

  useEffect(() => {
    fetchStores();
  }, [token]);

  const handleChange = e => setFilters(f => ({ ...f, [e.target.name]: e.target.value }));

  // Update rating in state after rating submission
  const handleRated = (storeId, rating) => {
    setStores(stores =>
      stores.map(s =>
        s.id === storeId ? { ...s, userRating: rating } : s
      )
    );
  };

  return (
    <div className="stores-container">
      <h2>Stores</h2>
       <div className="stores-filter-bar">
        <input
          name="name"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Filter by Address"
          value={filters.address}
          onChange={handleChange}
        />
        <button onClick={fetchStores}>Apply Filters</button>
      </div>
      <ul>
        {stores.map(s => (
          <li key={s.id}>
            {s.name} - {s.address} (Overall Rating: {s.overallRating})
            {s.userRating
              ? <span style={{ marginLeft: 10, color: "green" }}>You rated: {s.userRating}</span>
              : <RateStore storeId={s.id} onRated={handleRated} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
