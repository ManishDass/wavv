import TopNavigation from '../components/TopNavigation';
import Playlist from '../components/Playlist';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Liked = () => {
  
  const { likedSongs } = useAuth();

  return (
    <div className='bg-[#0F0817]/90 h-dvh font-santoshi-regular text-white'>
      <TopNavigation options={{ left: 'back', center: 'Liked Songs', onBack: 'home' }}/>
      <div className='mt-10'></div>
      <Playlist items={likedSongs} heading='Liked Songs' topbar='hidden' />
    </div>
  )
}

export default Liked