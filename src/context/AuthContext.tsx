'use client';
import { AuthContextType } from '@/types/context';

import { createContext, useContext, useState, ReactNode } from 'react';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('O useAuth deve ser usado dentro do AuthProvider.');
  }
  return context;
}
