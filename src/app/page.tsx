'use client';
import { LoginUser } from "@/components/Auth/Login";
import { supabase } from "@/utils/supabase";
import { userState } from "@/zustand/state";
import { useInitData } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";


export default function Home() {
  const initData = useInitData();
  const router = useRouter();
  const {loading, updateUserState} = userState()  

  // check for duplicate befor adding users to db
  const addRows =async()=>{
    if(loading) return false 
    updateUserState("loading", true)
    const { data, error } = await supabase
    .from('mine-cstz')
    .insert([
      { userId: initData?.user?.id,  points: 10000, earnTime: 0, frenTime:0, uplineFren:1000},
    ])
    .select()

    error?.message ? console.log("error", error?.message) : console.log("data", data)
    router.push('/earn');
    updateUserState("loading", false)
  }

  return (
    <LoginUser user={initData?.user?.username} to={() => addRows()}/>
  );
}
