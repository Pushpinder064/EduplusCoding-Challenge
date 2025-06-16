import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import StoreOwnerLayout from "../layouts/StoreOwnerLayout";
import UserLayout from "../layouts/UserLayout";
import PublicLayout from "../layouts/PublicLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Stores from "../pages/admin/Stores";
import StoreOwnerDashboard from "../pages/store-owner/Dashboard";
import MyStores from "../pages/store-owner/MyStores";
import Ratings from "../pages/store-owner/Ratings";
import UserDashboard from "../pages/user/Dashboard";
import UserStores from "../pages/user/Stores";
import Profile from "../pages/user/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RegisterStoreOwner from "../pages/auth/RegisterStoreOwner";
import RegisterAdmin from "../pages/auth/RegisterAdmin";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/register-store-owner" element={<RegisterStoreOwner />} />
          <Route path="/auth/register-admin" element={<RegisterAdmin />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="stores" element={<Stores />} />
        </Route>
        <Route path="/store-owner" element={<StoreOwnerLayout />}>
          <Route path="dashboard" element={<StoreOwnerDashboard />} />
          <Route path="my-stores" element={<MyStores />} />
          <Route path="ratings" element={<Ratings />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="stores" element={<UserStores />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
