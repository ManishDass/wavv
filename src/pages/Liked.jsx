import TopNavigation from '../components/TopNavigation';
import Playlist from '../components/Playlist';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Liked = () => {
  
  const { likedSongs } = useAuth();
  useEffect(()=>{
    console.log("X Liked Test: ",likedSongs)
  },[])

  return (
    <div className='bg-[#1C1B1B] h-dvh font-santoshi-regular text-white'>
      <TopNavigation options={{ left: 'back', center: 'Liked Songs' }}/>
      <div className='mt-10'></div>
      <Playlist items={likedSongs} heading='Liked Songs' topbar='hidden' />
    </div>
  )
}

export default Liked