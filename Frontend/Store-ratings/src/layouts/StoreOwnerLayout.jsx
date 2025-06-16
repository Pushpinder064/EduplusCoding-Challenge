import { Outlet, Link, useNavigate } from "react-router-dom";

export default function StoreOwnerLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    
    localStorage.removeItem("token");
    
    navigate("/auth/login");
  }

  return (
    <div>
      <nav style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link to="/store-owner/dashboard">Dashboard</Link> |{" "}
        <Link to="/store-owner/my-stores">My Stores</Link> |{" "}
        <Link to="/store-owner/ratings">Ratings</Link> |{" "}
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            textDecoration: "underline",
            cursor: "pointer",
            font: "inherit",
            padding: 0,
            margin: 0,
          }}
        >
          Logout
        </button>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
