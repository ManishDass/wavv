import React from 'react'
import TopNavigation from '../components/TopNavigation';

const Liked = () => {
  return (
    <div className='bg-[#1C1B1B] h-dvh font-santoshi-regular text-white'>
      <TopNavigation options={{ left: 'back', center: 'Liked Songs' }} />
      <h1 className=' px-2 text-white text-xl text-center flex justify-center items-center -mt-20 h-[100dvh]'>Liked Section Coming Soon</h1>
    </div>
  )
}

export default Liked