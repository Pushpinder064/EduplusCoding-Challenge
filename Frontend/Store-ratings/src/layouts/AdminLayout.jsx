import { Outlet, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div>
      <nav>
        <Link to="/admin/dashboard">Dashboard</Link> |{" "}
        <Link to="/admin/users">Users</Link> |{" "}
        <Link to="/admin/stores">Stores</Link> |{" "}
        <button onClick={handleLogout} style={{ marginLeft: 8 }}>Logout</button>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
