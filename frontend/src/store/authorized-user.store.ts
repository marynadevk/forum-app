import { create } from 'zustand';
import {IUser} from '../interfaces';
import { DEFAULT_USER } from 'src/constants/constants';

interface UserStoreState {
  user: IUser;
  setUser: (payload: IUser) => void;
  removeUser: () => void;
}

const initialState: IUser = DEFAULT_USER;

const useUserStore = create<UserStoreState>((set) => ({
  user: initialState,
  setUser: (payload: IUser) => set((state) => ({ ...state, user: payload })),
  removeUser: () => set({ user: initialState }),
}));

export default useUserStore;