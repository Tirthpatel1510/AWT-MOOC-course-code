import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

function getStoredAuth() {
  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role") || "";

  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return { token, role, user };
  } catch {
    return { token, role, user: null };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth);

  const login = ({ email, role }) => {
    const token = `demo-token-${Date.now()}`;
    const user = { email, role };

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));

    setAuth({ token, role, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setAuth({ token: "", role: "", user: null });
  };

  const value = useMemo(
    () => ({
      ...auth,
      isAuthenticated: Boolean(auth.token),
      login,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
