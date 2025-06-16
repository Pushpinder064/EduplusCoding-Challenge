import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./Users.css";

export default function Users() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });

  const fetchUsers = () => {
    axios.get("http://localhost:4000/api/admin/users", {
      params: filters,
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data));
  };

  useEffect(() => { fetchUsers(); }, [token]);

  const handleChange = e => setFilters(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="users-admin-container">
      <h2>All Users</h2>
      <div className="users-filter-bar">
        <input name="name" placeholder="Name" value={filters.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={filters.email} onChange={handleChange} />
        <input name="address" placeholder="Address" value={filters.address} onChange={handleChange} />
        <select name="role" value={filters.role} onChange={handleChange}>
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>
        <button onClick={fetchUsers}>Apply Filter</button>
      </div>
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
