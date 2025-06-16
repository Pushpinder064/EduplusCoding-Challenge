import useAuth from "../../hooks/useAuth";
import "./Dashboard.css";

export default function StoreOwnerDashboard() {
  const { user } = useAuth();
  return <div><h2>Welcome, {user?.name} (Store Owner)</h2>;</div>
}
