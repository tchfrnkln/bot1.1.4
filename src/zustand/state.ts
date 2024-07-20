import { create } from 'zustand';

export interface UserState {
    loading: boolean
    earnTime: number
    updateUserState: (key: any, value:any) => void
}


export const userState = create<UserState>((set) => ({
    loading: false,
    earnTime:0,
    updateUserState: (key, value) => {
      set((state) => ({
        ...state,
        [key]: value,
      }));
    },
}));
