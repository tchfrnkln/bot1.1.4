import React from 'react'
import "./style.css"
import Navigation from '@/components/NavBar/Navigation'
import Image from 'next/image'
import Wall from "../../../assets/image/walloffame.png"
import CommingSoon from '@/components/Indevelopment/CommingSoon'

const page = () => {
  return (
    <div className='flex-center h-screen'>
        <div className='flex-center w-full max-w-[300px] py-6'>
          <h1 className='text-xl font-[600] text-center'>Telegram Wall of Fame</h1>
          <Image alt='cstz' src={Wall}/>
          {/* <div className='w-full py-2'>
            <div className="flex-center flex-row justify-between w-full py-4">
              <div>
                <p>Wadzibell</p>
                <p className='text-gray-400 text-xs font-[600]'>3,615 CSTZ</p>
              </div>
              <p className="font-bold">#13,100</p>
            </div>
            <p className='text-[12px] font-[600] text-left w-full pb-[10px]'>20.2M holders</p>
          </div> */}
          <CommingSoon/>
        </div>

        <Navigation/>
    </div>
  )
}

export default page