import React from 'react'
import './styles.css';
import { initCloudStorage } from '@tma.js/sdk-react';
import Image from 'next/image';
import Cart from "../../../assets/image/cart.svg"
import { Button } from '@telegram-apps/telegram-ui';
import { userState } from '@/zustand/state';

export const LoginUser = ({user, to}:{user:string | undefined, to:()=> void}) => {
  const {loading} = userState()

  return (
    <div className='root'>
      <Image alt='cart' src={Cart} height={100}/>
      <h2 className='user'>{user}</h2>

      <Button className='button cursor-pointer active:-translate-y-[2px] flex-center flex-row' onClick={() => to()}>{loading ? <div className='spinnerSM'></div>: `Start Mining CSTZ`}</Button>
    </div>
  )
}
