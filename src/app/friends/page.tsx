import React from 'react'
import Navigation from '@/components/NavBar/Navigation'

import Family from "../../../assets/image/family.png"
import Fren from "../../../assets/image/freindSm.png"
import Image from 'next/image'

const page = () => {
  return (
    <div className='flex-center p-2'>
        
      <div className='flex-center w-full max-w-[300px]'>
        <div className='py-6 flex-center'>
          <Image src={Family} alt='invite frens' width={50}/>
          <p className='text-2xl font-[600]'>Invite Frens</p>
        </div>
        <div className='w-full border-[3px] rounded-[10px] border-gray-800 p-6 flex-center'>
          <p className='font-[600] text-2xl'>10</p>
          <div className='text-center p-2 rounded-full text-xs bg-gray-800 px-2 cursor-pointer'>Claim in 6hrs 3min</div>
        </div>
        <div className='flex-center py-6 w-full'>
          <p className='text-[12px] font-[600] text-left w-full pb-[10px]'>2 frens</p>
          <div className="flex-center flex-row justify-between w-full">
            <div>
              <p>Wadzibell</p>
              <div className='flex-center flex-row gap-2 justify-start'>
                <Image alt='fren' src={Fren} width={15}/>
                <p className='text-yellow-400 text-xs font-[600]'>0</p>
              </div>
            </div>
            <p className="font-bold">13,100 CSTZ</p>
          </div>
        </div>
      </div>

      <Navigation/>
    </div>
  )
}

export default page