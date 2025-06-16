import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );


  const login = (newToken, userObj) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userObj));
    setToken(newToken);
    setUser(userObj);
  };

  // this to logout
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
