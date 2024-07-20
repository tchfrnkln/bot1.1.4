import { create } from 'zustand';

export interface UserState {
    loading: boolean
    earnTime: number
    claimable: boolean
    updateUserState: (key: any, value:any) => void
}


export const userState = create<UserState>((set) => ({
    loading: false,
    earnTime:0,
    claimable:false,
    updateUserState: (key, value) => {
      set((state) => ({
        ...state,
        [key]: value,
      }));
    },
}));
