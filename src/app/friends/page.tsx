"use client"
import React, { useEffect } from 'react'
import Navigation from '@/components/NavBar/Navigation'

import Family from "../../../assets/image/family.svg"
import Fren from "../../../assets/image/freindSm.png"
import Image from 'next/image'
import { userState } from '@/zustand/state'
import { calculateSecondsDifference, CountdownTimerFren } from '@/components/countdown/Timer'
import { Button } from '@telegram-apps/telegram-ui'
import { supabase } from '@/utils/supabase'
import { useInitData } from '@tma.js/sdk-react'

const Page = () => {
  const {frenTime, claimableFren, pointsValue, downlines, updateUserState} = userState()
  const initData = useInitData();

  const claimCSTZFren = async() =>{
    const newValue = pointsValue + (downlines * 200)
    const twentyFourHours = new Date().getTime() + 60 *1000;
    const { data, error } = await supabase
    .from('mine-cstz')
    .update({ points: newValue, frenTime: twentyFourHours })
    .eq('userId', initData?.user?.username);

    if (error) {
      console.error('Error claiming CSTZ Fren:', error.message);
      return null;
    }

    updateUserState("pointsValue", newValue)
    updateUserState("frenTime", twentyFourHours)
    updateUserState("claimableFren", false)
  }

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
      updateUserState("earnTime", data.earnTime)
      updateUserState("frenTime", data.frenTime)
  
      const timeNow = new Date().getTime()
      const timeLeft = calculateSecondsDifference(data.earnTime, timeNow)
      const timeLeftFren = calculateSecondsDifference(data.frenTime, timeNow)
      
      timeLeft < 0 && updateUserState("claimable", true)
      timeLeftFren < 0 && updateUserState("claimableFren", true)
    }
  };

  const countDownlines = async (userId:string | undefined)=>{
    const { count, error } = await supabase
    .from('mine-cstz')
    .select('id', { count: 'exact' })
    .eq('uplineFren', userId);

    if (error) {
      console.error('Error fetching count:', error.message);
    } else {
      updateUserState("downlines", count)
    }
  }

  useEffect(() => {
    const userId = initData?.user?.username;
    fetchGamePoints(userId)
    countDownlines(userId)
  }, [])
  

  return (
    <div className='flex-center p-2 h-screen flex-center'>
      <div className='flex-center w-full max-w-[300px]'>
        <div className='py-6 flex-center'>
          <Image src={Family} alt='invite frens' width={40} className='py-2 rounded-full'/>
          <p className='text-2xl font-[600]'>Invite Frens</p>
        </div>
        <div className='flex justify-start items-center py-2 gap-2 w-full'>
          <Image alt='fren' src={Fren} width={15}/>
          <p className='text-[12px] font-[600] text-left w-full'>{`${downlines} frens`}</p>
        </div>
        <div className='w-full border-[3px] rounded-[10px] border-gray-800 p-6 flex-center gap-2'>
          <p className='font-[600] text-2xl'>{`${pointsValue.toLocaleString()} CSTZ`}</p>
          {claimableFren ? <Button onClick={()=> claimCSTZFren()}>Claim Time</Button> : <div className='flex justify-center items-center flex-row rounded-full text-xs bg-gray-800 p-4 cursor-pointer'><CountdownTimerFren endTime={frenTime}/></div>}
          <p className='font-[600] text-[12px] text-center'>claim fren points every 24hours</p>
        </div>
      </div>

      <Navigation/>
    </div>
  )
}

export default Page