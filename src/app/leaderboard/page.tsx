"use client"
import React, { useEffect } from 'react'
import "./style.css"
import Navigation from '@/components/NavBar/Navigation'
import Image from 'next/image'
import Wall from "../../../assets/image/walloffame.png"
import CommingSoon from '@/components/Indevelopment/CommingSoon'
import { userState } from '@/zustand/state'
import { useInitData } from '@tma.js/sdk-react'
import { supabase } from '@/utils/supabase'

const Page = () => {
  const {pointsValue, holders, holderRank, topUsers, updateUserState } = userState()
  const initData = useInitData();

  const fetchGamePoints = async (userId:string | undefined) => {
    const { data, error } = await supabase
      .from('mine-cstz')
      .select('points, earnTime, frenTime')
      .eq('userId', userId)
      .single();
  
    if (error) {
      console.error('Error fetching points:', error.message);
      return null;
    }
  
    
    if(data){
      updateUserState("pointsValue", data.points)
    }
  };

  const getUserStatistics = async(userId:string | undefined) => {
    const { count: totalUsers, error: countError } = await supabase
      .from('mine-cstz')
      .select('*', { count: 'exact' });
  
    if (countError) {
      console.error('Error fetching total users:', countError);
      return;
    }
  
    const { data: allUsers, error: allUsersError } = await supabase
      .from('mine-cstz')
      .select('userId')
      .order('points', { ascending: false });
  
    if (allUsersError) {
      console.error('Error fetching users:', allUsersError);
      return;
    }
  
    const userIndex = allUsers.findIndex(user => user.userId === userId);
    const userPosition = userIndex >= 0 ? userIndex + 1 : 'User not found';

    updateUserState("holders", totalUsers)
    updateUserState("holderRank", userPosition)


    const { data: topUsersData, error: topUsersError } = await supabase
    .from('mine-cstz')
    .select('userId, points, id')
    .order('points', { ascending: false })
    .limit(20);
  
    if (topUsersError) {
      console.error('Error fetching top users:', topUsersError);
    } else {
      const topUsersWithPosition = topUsersData.map((user, index) => ({
        ...user,
        position: index + 1
      }));
      updateUserState("topUsers", topUsersWithPosition);
    }  
    
  }  

  useEffect(() => {
    const userId = initData?.user?.username;
    fetchGamePoints(userId)
    getUserStatistics(userId)
  }, [])

  return (
    <div className='flex-center'>
        <div className='flex-center w-full max-w-[300px] py-6'>
          <h1 className='text-xl font-[600] text-center'>Telegram Wall of Fame</h1>
          <Image alt='cstz' src={Wall}/>
          <div className='w-full py-2'>
            <div className="flex-center flex-row justify-between w-full py-4">
              <div>
                <p>{initData?.user?.username}</p>
                <p className='text-gray-400 text-xs font-[600]'>{`${pointsValue.toLocaleString()} CSTZ`}</p>
              </div>
              <p className="font-bold">{`#${holderRank.toLocaleString()}`}</p>
            </div>
            <p className='text-[12px] font-[600] text-left w-full pb-[10px]'>{`${holders.toLocaleString()} holders`}</p>
          </div>
          <div className='max-h-[300px] overflow-y-scroll w-full'>
            {topUsers.map((top) =>(
              <div key={top.id} className="flex-center flex-row justify-between w-full py-4">
                <div>
                  <p>{top.userId}</p>
                  <p className='text-gray-400 text-xs font-[600]'>{`${top.points.toLocaleString()} CSTZ`}</p>
                </div>
                <p className="font-bold">{`#${top.position}`}</p>
              </div>
            )) 
            }
          </div>
        </div>

        <Navigation/>
    </div>
  )
}

export default Page