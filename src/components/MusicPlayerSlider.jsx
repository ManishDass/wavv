import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import useStore from '../stores/useStore';
import LoadingSpinner from './LoadingSpinner';
import useDarkMode from '../hooks/useDarkMode';
import NotFound from '../pages/NotFound';
import TopNavigation from './TopNavigation';
import UpArrow from '../assets/images/UpArrow.svg?react';
import HeartIcon from '../assets/images/HeartIcon.svg?react';
import PlayIcon from '../assets/images/Play.svg?react';
import PauseIcon from '../assets/images/Pause.svg?react';
import RepeatIcon2 from '../assets/images/repeat2.svg?react';
import PreviousIcon2 from '../assets/images/previous2.svg?react';
import NextIcon2 from '../assets/images/next2.svg?react';
import ShuffleIcon2 from '../assets/images/shuffle2.svg?react';
import { useAuth } from '../context/AuthContext';

const MusicPlayerSlider = ({ musicPlayerSliderHandler }) => {
  useDarkMode();
  const {
    videoid,
    metadata,
    audioUrl,
    isPlaying,
    currentTime,
    duration,
    setAudioUrl,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    showMusicPlayerSlider,
    toggleShowMusicPlayerSlider,
  } = useStore();

  useEffect(()=>{
    console.log("Video IDx: ",videoid)
    setIsChecked(false)
  },[videoid])

  const audioRef = useRef(null);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { likedSongHandler } = useAuth();
  const [isAudioRepeat, setIsAudioRepeat] = useState(false)

  const handleToggleModal = () => {
    setIsModalOpen(prev => !prev)
  }

  // Function responsible for fetching the audio from backend
  const fetchAudioUrl = async (videoId) => {
    try {
      const response = await axios.get(`https://wavv-server.vercel.app/youtube/${videoId}`, {
        responseType: 'blob',
      });
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } catch (error) {
      console.error('Error fetching audio:', error);
      throw error;
    }
  };

  // Fetching data using react query

  const { data: fetchedAudioUrl, isLoading, isError } = useQuery(['audioUrl', videoid], () => fetchAudioUrl(videoid), {
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: !!videoid,
  });

  useEffect(() => {
    const storedAudioUrl = localStorage.getItem('audioUrl');
    if (storedAudioUrl) {
      handleAudioLoaded(storedAudioUrl);
    }
  }, []);

  useEffect(() => {
    if (fetchedAudioUrl && !isLoading && !isError) {
      setAudioUrl(fetchedAudioUrl);
      handleAudioLoaded(fetchedAudioUrl);
    }
  }, [fetchedAudioUrl, isLoading, isError, setAudioUrl]);

  //Useeffect so that i can play/pause audio from other component using isPlaying State
  useEffect(() => {
    console.log("is Playing STate chnaged and rerendered")
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  const handleAudioLoaded = (url) => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = url;
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleMetadataLoaded);
    }
  };

  const handleMetadataLoaded = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    let offsetX;
    let clientWidth;

    if (e.type === 'touchend' || e.type === 'touchmove') {
      const touch = e.changedTouches[0];
      const rect = e.target.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      clientWidth = rect.width;
    } else {
      offsetX = e.nativeEvent.offsetX || 0;
      clientWidth = e.target.clientWidth || 1;
    }

    if (duration > 0) {
      const seekTime = (offsetX / clientWidth) * duration;
      if (!isNaN(seekTime) && isFinite(seekTime)) {
        audio.currentTime = seekTime;
        setCurrentTime(seekTime);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Restart audio when it ends
  const handleAudioEnded = () => {
    // Set a brief timeout to prevent immediate replay (if desired)
    if (isAudioRepeat) {
      console.log("Audio Repeat is on: ",isAudioRepeat)
      setTimeout(() => {
        audioRef.current.play();
      }, 1000); // Adjust delay as needed
    }
  };

  const handleAudioRepeat = () => {
    setIsAudioRepeat(prev => !prev)
  }

  return (
    <div className={`fixed h-dvh w-screen bg-[#1f2128] overflow-hidden z-50 ${showMusicPlayerSlider ? 'hidden' : ''}`}>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <NotFound errorDetails={'Error Fetching Data'} musicPlayerSliderHandler={musicPlayerSliderHandler} />
      ) : !metadata ? (<NotFound errorDetails={'Empty'} musicPlayerSliderHandler={musicPlayerSliderHandler} />) : (
        <div className='flex flex-col justify-between h-full'>
          <TopNavigation options={{ left: 'back', center: 'Now Playing', backHandler: toggleShowMusicPlayerSlider }} />

          <div className="p-4 flex flex-col -mt-5 h-[80%]">
            {audioUrl && <audio id="audio-element" ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} onEnded={handleAudioEnded} />}
            <div className="cover-wrapper mt-2">
              <img className="cover-shadow" src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} alt="Album Cover Shadow" />
              <img className="cover-img" src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} alt="Album Cover" />
            </div>

            <div className="mt-4 text-center flex justify-between items-center px-3">
              <div className='text-left'>
                <h2 className="text-lg font-satoshi font-semibold text-white">{metadata.songName}</h2>
                <p className="text-white text-lg text-[1.1rem] font-satoshi font-light">{metadata.songArtist}</p>
              </div>

              <div id="heart-container" className='mr-[0.4rem]' onClick={() => likedSongHandler(metadata, isChecked)}>
                <input type="checkbox" id="toggle" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                <div id="twitter-heart"></div>
              </div>
            </div>

            <div className="mt-4">
              {/* Seekbar */}
              <div className="w-full flex flex-col px-3 z-50 mt-5">
                <input
                  type="range"
                  className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                  id="song-percentage-played"
                  step="0.1"
                  min="0"
                  max={duration || ''}
                  value={isSeeking ? currentTime : currentTime}
                  onMouseDown={() => setIsSeeking(true)}
                  onMouseUp={handleSeek}
                  onTouchStart={() => setIsSeeking(true)}
                  onTouchEnd={handleSeek}
                  onChange={() => { }} // Prevent default behavior of onChange for input[type=range]
                />
              </div>

              <div className="flex justify-between text-gray-400 text-xs font-satoshi font-bold -mt-1 px-4">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className='flex items-center justify-center mt-10'>
              <div className='flex justify-around items-center w-[80%]'>


                <div className='relative flex flex-col' onClick={handleAudioRepeat}>
                  <RepeatIcon2 fill={`${isAudioRepeat ? '#62CD5D' : 'white'}`} />
                  <span className={`absolute flex h-[2px] w-[2px] top-6 left-[0.7rem] ${isAudioRepeat ? '' : 'hidden'}`}>
                    <span className="animate-ping absolute inline-flex h-[2px] w-[2px] rounded-full bg-[#62CD5D] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-[2px] w-[2px] bg-[#62CD5D]"></span>
                  </span>
                </div>


                <PreviousIcon2 />
                <button className="bg-green-500 p-3 rounded-full focus:outline-none" onClick={handlePlayPause}>
                  {isPlaying ? (
                    <PauseIcon />
                  ) : (
                    <PlayIcon />
                  )}
                </button>
                <NextIcon2 />
                <ShuffleIcon2 />
              </div>
            </div>

          </div>

          <div className='flex text-white text-xs flex-col justify-center items-center font-satoshi font-bold h-[10%]'>
            <UpArrow className='mb-2' onClick={() => setIsModalOpen(!isModalOpen)} />
            <p onClick={() => setIsModalOpen(!isModalOpen)}>Lyrics</p>
          </div>

        </div>
      )}


      {isModalOpen && (
        <div className='fixed h-dvh w-screen bg-[#1B1A1A] z-50 top-0'>
          <TopNavigation options={{ left: 'back', center: metadata.songName, backHandler: handleToggleModal }} />
          <div className='flex text-white font-sans text-2xl h-dvh w-screen justify-center items-center -mt-20'>
            <h1>Coming Soon</h1>
          </div>
          <div className='fixed bottom-[0rem]'>
            <div
              className="relative w-full h-16 bg-cover bg-center"
              style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoid}/sddefault.jpg)` }}
            >
              <div className="backdrop-blur-xl bg-white/30 h-full flex justify-between items-center w-screen rounded-t-lg">

                <img className='bg-cover w-[3.3rem] h-[3.3rem] ml-[1rem]' src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} alt={metadata.songName} />

                <div className="marquee-container overflow-hidden flex flex-col">
                  <p className="marquee-text">
                    <span className="inline-block">{metadata.songName}</span>
                    <span className="inline-block pl-2"> • </span>
                    <span className="inline-block pl-2">{metadata.songArtist}</span>
                  </p>
                </div>

                <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] '>
                  <HeartIcon className="h-6 w-6 cursor-pointer" fill={'#42C83C'} stroke={'#737373'} />
                </div>
                <button className="bg-green-500 p-2 mr-4 rounded-full focus:outline-none" onClick={handlePlayPause}>
                  {isPlaying ? (
                    <PauseIcon />
                  ) : (
                    <PlayIcon />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

      )}

    </div>

  );
};

export default MusicPlayerSlider;