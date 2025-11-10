import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext({
  isLogged: false,
  checking: true,
  reload: () => {},
  logout: () => {},
  login: () => {},
});

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [checking, setChecking] = useState(true);

  const login = useCallback(async () => {
    window.location.href = "http://localhost:3001/auth/login";
  }, []);

  const logout = useCallback(async () => {
    await axios.get("http://localhost:3001/auth/logout", {
      withCredentials: true,
    });
    setIsLogged(false);
  }, []);

  const reload = useCallback(async () => {
    setChecking(true);
    try {
      const r = await axios.get("http://localhost:3001/auth/status", {
        withCredentials: true,
      });
      setIsLogged(Boolean(r.data.authenticated));
    } catch (err) {
      console.error("Failed to check auth status:", err);
      setIsLogged(false);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <AuthContext.Provider value={{ isLogged, checking, login, reload, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
