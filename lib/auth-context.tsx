'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clearAuthFromStorage,
  loginUser,
  refreshTokenFn,
  saveAuthToStorage,
} from "./api";
import { AuthStatus, User } from "./types";

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  status: 'loading',
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    // Check if user is already logged in
    const loadUserFromStorage = () => {
      try {
        const authData = localStorage.getItem('auth');
        
        if (!authData) {
          setStatus('unauthenticated');
          return;
        }
        
        const { user: storedUser, token, refreshToken: storedRefreshToken, expiresAt } = JSON.parse(authData);
        
        if (!token || !storedRefreshToken) {
          setStatus('unauthenticated');
          return;
        }
        
        // Check if token is about to expire (within 5 minutes)
        const expirationDate = new Date(expiresAt);
        const now = new Date();
        const fiveMinutes = 5 * 60 * 1000;
        
        if (expirationDate.getTime() - now.getTime() < fiveMinutes) {
          // Token is about to expire, try to refresh it
          refreshTokenFn(token, storedRefreshToken)
            .then((response) => {
              if (response.Success) {
                setUser(response.User);
                saveAuthToStorage(response);
                setStatus("authenticated");
              } else {
                clearAuthFromStorage();
                setStatus("unauthenticated");
              }
            })
            .catch(() => {
              clearAuthFromStorage();
              setStatus("unauthenticated");
            });
        } else {
          // Token is still valid
          setUser(storedUser);
          setStatus('authenticated');
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        clearAuthFromStorage();
        setStatus('unauthenticated');
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (username: string, password: string) => {
    setStatus('loading');
    
    try {
      const response = await loginUser(username, password);
      
      if (response.Success) {
        setUser(response.User);
        saveAuthToStorage(response);
        setStatus('authenticated');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setStatus('unauthenticated');
      throw error;
    }
  };

  const logout = () => {
    clearAuthFromStorage();
    setUser(null);
    setStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);