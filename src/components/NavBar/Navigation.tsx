import React from 'react'
import "./style.css"

import Home from "../../../assets/image/nav-home.png"
import Friends from "../../../assets/image/nav-friends.png"
import Podiom from "../../../assets/image/nav-podiom.png"
import Image from 'next/image'
import Link from 'next/link'


const Navigation = () => {

    const navContent = [
        {key:0, name:"Earn", icon:Home, to:"/earn"},
        {key:1, name:"Leaderboard", icon:Podiom, to:"/leaderboard"},
        {key:2, name:"Friends", icon:Friends, to:"/friends"},
    ]
  return (
    <div className='body z-10 flex-center bg-black'>
        {
            navContent.map(nav =>(
                <Link href={nav.to} key={nav.key} className='contentFrame'>
                    <Image color='white' src={nav.icon} alt='home' width={20}/>
                    <p className='smallText'>{nav.name}</p>
                </Link>
            ))
        }
    </div>
  )
}

export default Navigation