import {create} from 'zustand';

interface AuthState {
  email: string;
  password: string;
  otp: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setOtp: (otp: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  otp: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setOtp: (otp) => set({ otp }),
}));
