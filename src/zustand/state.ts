import { create } from 'zustand';

export interface UserState {
    loading: boolean
    updateUserState: (key: any, value:any) => void
}


export const userState = create<UserState>((set) => ({
    loading: false,
    updateUserState: (key, value) => {
      set((state) => ({
        ...state,
        [key]: value,
      }));
    },
}));
