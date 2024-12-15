import { create } from 'zustand';
import { IUser } from '../interfaces';

interface UserStoreState {
  user: IUser | null;
  notificationsCount: number;
  setUser: (payload: IUser | null) => void;
  setNotificationsCount: (payload: number) => void;
  removeUser: () => void;
}

const initialState = {
  user: null,
  notificationsCount: 0,
};

const useUserStore = create<UserStoreState>((set) => ({
  user: initialState.user,
  notificationsCount: initialState.notificationsCount,
  setNotificationsCount: (payload: number) => set((state) => ({ ...state, notificationsCount: payload })),
  setUser: (payload: IUser | null) => set((state) => ({ ...state, user: payload })),
  removeUser: () => set({ user: initialState.user, notificationsCount: initialState.notificationsCount }),
}));

export default useUserStore;