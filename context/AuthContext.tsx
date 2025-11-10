'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { authAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { User } from '@/types/user'; // Assuming you have a User type definition

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, password: string) => Promise<boolean>;
  register: (phoneNumber: string, fullName: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAuthFailure = useCallback((message: string) => {
    setUser(null);
    authAPI.logout();
    toast.error(message);
  }, []);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
    } catch (error) {
      handleAuthFailure('Your session has expired. Please log in again.');
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthFailure]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  const login = async (phoneNumber: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(phoneNumber, password);
      if (response.error) {
        toast.error(response.error);
        return false;
      }
      await fetchUser();
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (phoneNumber: string, fullName: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(phoneNumber, fullName, password);
      if (response.error) {
        toast.error(response.error);
        return false;
      }
      await fetchUser();
      toast.success('Registration successful! Welcome!');
      return true;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const isAuthenticated = !isLoading && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
