import { create } from 'zustand';

export interface UserState {
  topUsers:{id:number, userId:string, points:number, position:number}[],
  pointsValue: number
  earnTime: number
  frenTime: number
  downlines:number
  holderRank:number
  holders:number
  loading: boolean
  claimable: boolean
  claimableFren: boolean
  updateUserState: (key: any, value:any) => void
}


export const userState = create<UserState>((set) => ({
  topUsers:[],
  pointsValue:0,
  earnTime:0,
  frenTime:0,
  downlines:0,
  holders:0,
  holderRank:0,
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
