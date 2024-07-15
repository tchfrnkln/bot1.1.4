import React from 'react'
import './styles.css';
import { initCloudStorage, initMainButton, useInitData } from '@tma.js/sdk-react';
import Link from 'next/link';
import Image from 'next/image';
import Cart from "../../../assets/image/cart.svg"

export const LoginUser = () => {
  const initData = useInitData();
  const cloudStorage = initCloudStorage();
  const [mainButton] = initMainButton();


  // cloudStorage
  // .set('name', 'Franklin')
  // .then(() => console.log('Item saved'));

  // mainButton.hide();



  return (
    <div className='root'>
      <Image alt='cart' src={Cart} height={100}/>
      <h2 className='user'>{initData?.user?.username}</h2>

      <Link className='button' href="./mine-cstz">Start Mining CSTZ</Link>
    </div>
  )
}
