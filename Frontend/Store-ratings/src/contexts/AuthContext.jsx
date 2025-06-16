import { createContext, useContext, useState } from "react";

// Named export for context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  // Restore token and user from localStorage if present
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );

  // Call this after login to set token and user
  const login = (newToken, userObj) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userObj));
    setToken(newToken);
    setUser(userObj);
  };

  // Call this to logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Default export: useAuth hook
export default function useAuth() {
  return useContext(AuthContext);
}
