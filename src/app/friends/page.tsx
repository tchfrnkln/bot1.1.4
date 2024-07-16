import React from 'react'
import "./style.css"
import Navigation from '@/components/NavBar/Navigation'

const page = () => {
  return (
    <div className='contentFrame'>
        
        <p>Friends Page</p>

        <div>Total Frens 100</div>

        <Navigation/>
    </div>
  )
}

export default page