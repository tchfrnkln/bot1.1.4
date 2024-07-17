import React from 'react'
import "./style.css"
import Navigation from '@/components/NavBar/Navigation'
import Image from 'next/image'
import Wall from "../../../assets/image/walloffame.png"

const page = () => {
  return (
    <div className='flex-center'>
        <div className='flex-center w-full max-w-[300px] p-6'>
          <Image alt='cstz' src={Wall}/>
          <h1 className='text-xl font-[600] text-center'>Telegram Wall of Fame</h1>
          <div className='w-full'>
            <div className="flex-center flex-row justify-between w-full py-4">
              <div>
                <p>Wadzibell</p>
                <p className='text-gray-400 text-xs font-[600]'>3,615 CSTZ</p>
              </div>
              <p className="font-bold">#13,100</p>
            </div>
            <p className='text-[12px] font-[600] text-left w-full pb-[10px]'>20.2M holders</p>
          </div>
        </div>

        <Navigation/>
    </div>
  )
}

export default page