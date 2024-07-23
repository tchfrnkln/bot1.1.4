import { create } from 'zustand';

export interface UserState {
  pointsValue: number
  earnTime: number
  frenTime: number
  downlines:number
  loading: boolean
  claimable: boolean
  claimableFren: boolean
  updateUserState: (key: any, value:any) => void
}


export const userState = create<UserState>((set) => ({
  pointsValue:0,
  earnTime:0,
  frenTime:0,
  downlines:0,
  loading: false,
  claimable:false,
  claimableFren:false,
  updateUserState: (key, value) => {
    set((state) => ({
      ...state,
      [key]: value,
    }));
  },
}));
