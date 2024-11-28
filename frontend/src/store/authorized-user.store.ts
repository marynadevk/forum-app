import { create } from 'zustand';
import { IUser } from '../interfaces';

interface UserStoreState {
  user: IUser | null;
  setUser: (payload: IUser | null) => void;
  removeUser: () => void;
}

const initialState = null;

const useUserStore = create<UserStoreState>((set) => ({
  user: initialState,
  setUser: (payload: IUser | null) => set((state) => ({ ...state, user: payload })),
  removeUser: () => set({ user: initialState }),
}));

export default useUserStore;