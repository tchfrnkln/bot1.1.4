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


  const addRows = async () => {
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
        console.error('Error checking user existence:', checkError.message);
        updateUserState("loading", false);
        return;
      }
  
      if (existingUser) {
        // User already exists
        console.log('User already exists:', existingUser);
        router.push('/earn');
        updateUserState("loading", false);
        return;
      }
  
      // User does not exist, proceed with insertion
      const { data, error } = await supabase
        .from('mine-cstz')
        .insert([
          { userId, points: 10000, earnTime: 0, frenTime: 0, uplineFren: 1000 },
        ])
        .select();
  
      if (error) {
        console.error('Error inserting user:', error.message);
      } else {
        console.log('User inserted:', data);
        router.push('/earn');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Unexpected error:', error.message);
      }
    } finally {
      updateUserState("loading", false);
    }
  };
  

  return (
    <LoginUser user={initData?.user?.username} to={() => addRows()}/>
  );
}
