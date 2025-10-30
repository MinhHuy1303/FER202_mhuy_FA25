import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = async (username, password) => {
    try {
      const res = await axios.get(`http://localhost:3001/accounts?username=${username}&password=${password}`);
      if (res.data.length > 0) {
        setUser(res.data[0]);
        setError("");
        return true;
      } else {
        setError("Sai tài khoản hoặc mật khẩu");
        return false;
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi server");
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
