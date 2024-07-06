import React from 'react'
import TopNavigation from '../components/TopNavigation';

const Liked = () => {
  return (
    <div className='bg-[#1C1B1B] h-screen font-santoshi-regular text-white'>
      <TopNavigation options={{ left: 'back', center: 'Liked Songs' }} />
      <h1 className='text-white text-2xl text-center flex justify-center items-center h-dvh -mt-16'>Liked Section Coming Soon</h1>
    </div>
  )
}

export default Liked