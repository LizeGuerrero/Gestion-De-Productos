export interface User {
    _id: string;
    username: string;
    email: string;

  }
  
  export interface AuthResponse {
    mensaje: string;
    token: string;
    user?: User;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    username: string;
    email: string;
    password: string;
  }

  export interface ErrorResponse {
    status: number;
    mensaje: string;
  }