import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => ({
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
    fullName: localStorage.getItem('fullName') || '',
    email: localStorage.getItem('email') || ''
  }));

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('fullName', data.fullName);
    localStorage.setItem('email', data.email);
    setAuth(data);
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: '', role: '', fullName: '', email: '' });
  };

  const value = useMemo(() => ({ auth, login, logout }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
