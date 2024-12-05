import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type TokenStore = {
  token: string | null;
  setToken: (payload: string | null) => void;
  removeToken: () => void;
};

const initialState: string | null = null;

const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      token: initialState,
      setToken: (payload) => set(() => ({ token: payload })),
      removeToken: () => set({ token: initialState }),
    }),
    {
      name: 'token-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTokenStore;
