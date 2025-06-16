import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getMyStores } from "../../api/stores";
import "./MyStores.css";

export default function MyStores() {
  const { token } = useAuth();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getMyStores(token).then(res => setStores(res.data));
  }, [token]);

  return (
     <div className="my-stores-container">
      <h2>My Stores</h2>
      <ul className="my-stores-list">
        {stores.map(s => (
          <li key={s.id}>{s.name} - {s.address}</li>
        ))}
      </ul>
    </div>
  );
}
