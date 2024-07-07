
import { useEffect, useState } from 'react';
import HomeIcon from '../assets/images/Home.svg?react';
import DiscoveryIcon from '../assets/images/Discovery.svg?react';
import HeartIcon from '../assets/images/Heart.svg?react';
import ProfileIcon from '../assets/images/Profile.svg?react';
import useStore from '../stores/useStore'; // Adjust the path accordingly
import HomePage from './HomePage';
import MusicSearch from '../components/MusicSearch';
import Liked from './Liked';
import Profile from './Profile';
import MusicPlayerSlider from '../components/MusicPlayerSlider';
import useDarkMode from '../hooks/useDarkMode';

const Home = ({preSelectedTab}) => {
  useDarkMode(); //add or remove dark mode according to device-color-scheme
  const [selectedTab, setSelectedTab] = useState('');
  const { sharedState, setUserData ,setSharedState } = useStore();
 
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Update selectedTab when preSelected changes
  useEffect(() => {
    console.log('%cHello, %cWorld!', 'color: red; font-weight: bold;', 'color: green; font-style: italic;');
    setSelectedTab('discover');
  }, [sharedState]);

  useEffect(()=>{
    setSelectedTab(preSelectedTab || 'home')
  },[])

  useEffect(() => {
    const storedUserProfileIcon = localStorage.getItem('userProfileIcon');
    if (storedUserProfileIcon) {
      setUserData(JSON.parse(storedUserProfileIcon));
    }
  }, []);

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className=' bg-[#1B1A1A] overflow-hidden font-santoshi-regular'>

      {/* Render different components based on the selected tab */}
      {selectedTab === 'home' && <HomePage />}
      {selectedTab === 'discover' && <MusicSearch />}
      {selectedTab === 'liked' && <Liked />}
      {selectedTab === 'profile' && <Profile />}
      {selectedTab === 'music' && <MusicPlayerSlider />}


      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#343434] py-5 flex justify-around items-center">
        <div className="flex flex-col items-center justify-center relative">
          <div className={`bg-[#62CD5D] ${selectedTab === 'home' ? '' : 'hidden'} h-[0.26rem] w-6 absolute bottom-[2.47rem] rounded-b-xl`}></div>
          <HomeIcon onClick={() => handleTabClick('home')} className="h-6 w-6 cursor-pointer" fill={selectedTab === 'home' ? '#42C83C' : '#343434'} stroke={selectedTab === 'home' ? '' : '#737373'} />
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className={`bg-[#62CD5D] ${selectedTab === 'discover' ? '' : 'hidden'} h-[0.26rem] w-6 absolute bottom-[2.47rem] rounded-b-xl`}></div>
          <DiscoveryIcon onClick={() => handleTabClick('discover')} className="h-6 w-6 cursor-pointer" fill={selectedTab === 'discover' ? '#42C83C' : '#343434'} stroke={selectedTab === 'discover' ? '' : '#737373'} />
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className={`bg-[#62CD5D] ${selectedTab === 'liked' ? '' : 'hidden'} h-[0.26rem] w-6 absolute bottom-[2.47rem] rounded-b-xl`}></div>
          <HeartIcon onClick={() => handleTabClick('liked')} className="h-6 w-6 cursor-pointer" fill={selectedTab === 'liked' ? '#42C83C' : '#343434'} stroke={selectedTab === 'liked' ? '' : '#737373'} />
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className={`bg-[#62CD5D] ${selectedTab === 'profile' ? '' : 'hidden'} h-[0.26rem] w-6 absolute bottom-[2.47rem] rounded-b-xl`}></div>
          <ProfileIcon onClick={() => handleTabClick('profile')} className="h-6 w-6 cursor-pointer" fill={selectedTab === 'profile' ? '#42C83C' : '#343434'} stroke={selectedTab === 'profile' ? '' : '#737373'} />
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className={`bg-[#62CD5D] ${selectedTab === 'music' ? '' : 'hidden'} h-[0.26rem] w-6 absolute bottom-[2.47rem] rounded-b-xl`}></div>
          <ProfileIcon onClick={() => handleTabClick('music')} className="h-6 w-6 cursor-pointer" fill={selectedTab === 'music' ? '#42C83C' : '#343434'} stroke={selectedTab === 'music' ? '' : '#737373'} />
        </div>
      </div>
    </div>
  );
};

export default Home;
