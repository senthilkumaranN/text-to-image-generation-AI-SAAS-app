import React from 'react'
import { assets } from '../assets/assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-center gap-4 py-3 mt-20'>
        <img src={assets.logo} alt='' width={150}/>
        <p className='flex-1 text-gray-600 text-sm max-sm:hidden pt-2'>Crafted by Sen</p>

        <div className='flex gap-2.5'>
            <img src={assets.twitter_icon} alt='' width={35}/>
            <img src={assets.facebook_icon} alt='' width={35}/>
            <img src={assets.instagram_icon} alt='' width={35}/>
        </div>
    </div>
  )
}

export default Footer