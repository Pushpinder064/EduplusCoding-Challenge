import useAuth from "../../hooks/useAuth";
import "./Dashboard.css";

export default function UserDashboard() {
  const { user } = useAuth();
  return <h2>Welcome, {user?.name} (User)</h2>;
}
