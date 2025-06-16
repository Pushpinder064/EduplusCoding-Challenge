import { Outlet, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Adjust path if needed

export default function UserLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div>
      <nav>
        <Link to="/user/dashboard">Dashboard</Link> |{" "}
        <Link to="/user/stores">Stores</Link> |{" "}
        <Link to="/user/profile">Profile</Link> |{" "}
        <button onClick={handleLogout} style={{ marginLeft: 8 }}>Logout</button>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
