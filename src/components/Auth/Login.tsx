import React from 'react'
import './styles.css';
import { useInitData } from '@tma.js/sdk-react';
import Link from 'next/link';
import Image from 'next/image';
import Cart from "../../../assets/image/cart.svg"

export const LoginUser = () => {
  const initData = useInitData();

  return (
    <div className='root'>
      <Image alt='cart' src={require("../../../assets/image/cart.svg")} height={100}/>
      <h2 className='user'>{initData?.user?.username}</h2>

      <Link className='button' href="./mine-cstz">Start Mining CSTZ</Link>
    </div>
  )
}
