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


  const updateRows = async () => {
    if (loading) return false;
    updateUserState("loading", true);
    const userId = initData?.user?.username;
  
    try {
      // Check if the user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('mine-cstz')
        .select('userId')
        .eq('userId', userId)
        .single();
  
      if (checkError && checkError.code !== 'PGRST116') {
        // Handle error other than not found (PGRST116 is the code for no row returned)
        console.log('Error checking user existence:', checkError.message);
        updateUserState("loading", false);
        return;
      }
  
      if (existingUser) {
        // User already exists
        console.log('User already exists:', existingUser);
        checkEarntime(userId)
        updateUserState("loading", false);
        router.push('/earn');
        // updateUserState("loading", false);
        // return;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Unexpected error:', error.message);
      }
    }
  };

  const checkEarntime = async (userId:string | undefined) => {
    const { data, error } = await supabase
      .from('mine-cstz')
      .select('earnTime')
      .eq('userId', userId)
      .single();
  
    if (error) {
      console.error('Error fetching points:', error.message);
      return null;
    }
  
    data && updateUserState("earnTime", data.earnTime)  
  };

  

  return (
    <LoginUser user={initData?.user?.username} to={() => updateRows()}/>
  );
}
