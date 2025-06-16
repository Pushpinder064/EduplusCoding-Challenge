import { Outlet, Link } from "react-router-dom";
export default function PublicLayout() {
  return (
    <div>
      <nav>
        <Link to="/auth/login">Login</Link> |{" "}
        <Link to="/auth/register">Register</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
