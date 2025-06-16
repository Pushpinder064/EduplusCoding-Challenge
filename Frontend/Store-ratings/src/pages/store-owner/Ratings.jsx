import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./Ratings.css";

export default function Ratings() {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/store/my", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setData(res.data));
  }, [token]);

  return (
    <div className="ratings-container">
      <h2>Ratings for My Stores</h2>
      {data.map(store => (
        <div className="store-rating-card" key={store.id}>
          <h3>{store.name} (Avg: {store.avgRating})</h3>
          <ul className="ratings-list">
            {store.ratings.map((r, idx) => (
              <li key={idx}>{r.user.name} : {r.rating}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
