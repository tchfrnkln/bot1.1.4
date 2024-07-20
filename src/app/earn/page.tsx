"use client"
import Navigation from '@/components/NavBar/Navigation'
import React, { useEffect, useState } from 'react'
import "./style.css"
import { Button } from '@telegram-apps/telegram-ui'
import { gsap, Back, Bounce } from "gsap"
import CountdownTimer from '@/components/countdown/Timer'
import { useInitData } from '@tma.js/sdk-react'
import { supabase } from '@/utils/supabase'

const Page = () => {

  const [value, setvalue] = useState(0)

  const initData = useInitData();

  const fetchGamePoints = async (userId:string | undefined) => {
    const { data, error } = await supabase
      .from('mine-cstz')
      .select('points')
      .eq('userId', userId)
      .single();
  
    if (error) {
      console.error('Error fetching points:', error.message);
      return null;
    }
  
    data ? setvalue(data.points) : setvalue(0)
    
    // return data ? data.points : null;
  };

  const [farmButton, setfarmButton] = useState(true)

  const animateBoxes = () => {
    const tl = gsap.timeline();
    const time = 3;

    gsap.set("#box1, #box2, #box3", { autoAlpha: 1 });

    tl.add('start');

    tl.to('#box1', {
      duration: time,
      rotation: '85',
      transformOrigin: "center center",
      ease: "none"
    }, 'start');

    tl.to('#box2', {
      duration: time,
      rotation: '-80',
      transformOrigin: "center center",
      ease: "none"
    }, 'first');

    tl.to('#box3', {
      duration: 0.5,
      rotation: '-87',
      transformOrigin: "center center",
      ease: "none"
    }, 'second');

    tl.to('#box1', {
      duration: 0.1,
      y: '1px',
      yoyo: true,
      repeat: 1
    }, 'last-=0.25');

    tl.to('#box2', {
      duration: 0.1,
      y: '1px',
      yoyo: true,
      repeat: 1
    }, 'last-=0.25');
  };

  // const userId = initData?.user?.username
  useEffect(() => {
    const userId = initData?.user?.username;

    animateBoxes();
    fetchGamePoints(userId)
    const interval = setInterval(() => {
      animateBoxes();
    }, 10000);
    return () => clearInterval(interval);
  }, [initData]);

  const startFarmingCSTZ = () =>{
    setfarmButton(!farmButton)
  }

  const specificEndTime = new Date().getTime() + 7 * 60 * 60 * 1000;

  return (
    <div className='flex-center h-screen'>
      <svg id="cart" stroke="orange" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85.4 81.3">
        <title>mine CSTZ</title>
        <rect className="box" id="box1" x="28" y="22" width="24" height="24" fill="#99cc33" stroke="white" strokeWidth="1"/>
        <rect className="box" id="box2" x="50" y="22" width="22" height="22" fill="#3399cc" stroke="white" strokeWidth="1"/>
        <rect className="box" id="box3" x="40" y="8" width="18" height="18" fill="#cc3399" stroke="white" strokeWidth="1"/>
        <path d="M95.34,94,31.42,89.36,29,75.25H10.66v4h15L35.5,137a9.82,9.82,0,1,0,11.35,3.36h29.4a9.8,9.8,0,1,0,7.89-4H39.44l-1.5-8.73H86.11ZM44.77,146.16a5.81,5.81,0,1,1-5.8-5.82h0A5.82,5.82,0,0,1,44.77,146.16Zm45.17,0a5.81,5.81,0,1,1-5.81-5.81h0A5.82,5.82,0,0,1,89.94,146.16ZM37.26,123.61,32.12,93.43l58.07,4.18-7.13,26Z" transform="translate(-10.66 -75.25)"/>
      </svg>


      <div className='text-2xl py-4 font-[600] flex-center gap-1'>
        <p>{value.toLocaleString()}</p>
        <p className='text-xs'>CSTZ</p>
      </div>


      <div className='flex-center py-4 w-full max-w-[250px] m-3'>
        {farmButton ? <Button onClick={()=> startFarmingCSTZ()}>Start Farming</Button> : <div className='flex-center bg-gray-700 text-gray-400 text-xs font-[600] p-3 rounded-lg w-full cursor-pointer'><CountdownTimer endTime={specificEndTime}/></div>}
      </div>

      <Navigation/>
    </div>
  )
}

export default Page
