import { jwtDecode } from 'jwt-decode';
import { User } from '../types/user';

export const login = (token: string, setUser: React.Dispatch<React.SetStateAction<User | null>>, setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>) => {
  localStorage.setItem('token', token);
  const decodedUser: User = jwtDecode(token);
  setUser(decodedUser);
  setIsAuthenticated(true);
};

export const logout = (setUser: React.Dispatch<React.SetStateAction<User | null>>, setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>) => {
  localStorage.removeItem('token');
  setUser(null);
  setIsAuthenticated(false);
};