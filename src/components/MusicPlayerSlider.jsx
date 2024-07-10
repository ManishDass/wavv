import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import useStore from '../stores/useStore';
import LoadingSpinner from './LoadingSpinner';
import useDarkMode from '../hooks/useDarkMode'
import NotFound from '../pages/NotFound';
import TopNavigation from './TopNavigation';
import UpArrow from '../assets/images/UpArrow.svg?react';
import RepeatIcon from '../assets/images/Repeat.svg?react'
import PreviousIcon from '../assets/images/Previous.svg?react'
import NextIcon from '../assets/images/Next.svg?react'
import ShuffleIcon from '../assets/images/Shuffle.svg?react'
import HeartIcon from '../assets/images/HeartIcon.svg?react'
import Play from '../assets/images/Play.svg?react'
import PlayIcon from '../assets/images/Play.svg?react'
import PauseIcon from '../assets/images/Pause.svg?react'
import RepeatIcon2 from '../assets/images/repeat2.svg?react'
import PreviousIcon2 from '../assets/images/previous2.svg?react'
import NextIcon2 from '../assets/images/next2.svg?react'
import ShuffleIcon2 from '../assets/images/shuffle2.svg?react'
import BackIcon from '../assets/images/Back.svg?react';
import { useAuth } from '../context/AuthContext';

const fetchAudioUrl = async (videoId) => {
  try {
    const response = await axios.get(`https://wavv-server.vercel.app/youtube/${videoId}`, { responseType: 'blob' });
    // const response = await axios.get(`http://localhost:4000/youtube/${videoId}`, { responseType: 'blob' });
    const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error fetching audio:', error);
    throw error;
  }
};

const MusicPlayerSlider = () => {
  useDarkMode(); //add or remove dark mode according to device-color-scheme
  const { videoid, metadata } = useStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false); // Add isSeeking state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    // console.log("Checkbox Status: ",event.target.checked)
  };

  const { likedSongHandler } = useAuth()

  const likeHandler = () => {
    setLiked((prev) => !prev)
    console.log("Hello")
  }

  const handleToggleModal = () => {
    console.log("Working Modal Handler!")
    setIsModalOpen(!isModalOpen);
  };


  const { data: audioUrl, isLoading, isError } = useQuery(['audioUrl', videoid], () => fetchAudioUrl(videoid), {
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // Only proceed if audioUrl is defined and not loading/error
    if (audioUrl && !isLoading && !isError) {
      const audio = document.getElementById('audio-element');

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      };

      if (audio) {
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
          audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
      }
    }
  }, [audioUrl, isLoading, isError]); // Depend on audioUrl and query status

  useEffect(() => {
    // Set document title based on metadata whenever it changes
    document.title = `${metadata.songName} - ${metadata.songArtist} | Wavv`;
  }, [metadata.songName, metadata.songArtist]); // Depend on metadata changes

  const handleLikeSong = (songDetails) => {
    const metadata = songDetails;
    console.log(metadata)
    likedSongHandler(metadata, !isChecked);
  };

  useEffect(() => {
    // Set up event listeners and any other initialization
    const audio = document.getElementById('audio-element');

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    // Only proceed if audio element is available and audioUrl is defined and not loading/error
    if (audio && audioUrl && !isLoading && !isError) {
      audio.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [audioUrl, isLoading, isError]);

  const handlePlayPause = () => {
    const audio = document.getElementById('audio-element');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    const audio = document.getElementById('audio-element');
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleReset = () => {
    const audio = document.getElementById('audio-element');
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
    audio.pause();
  };


  const handleTimeUpdate = () => {
    const audio = document.getElementById('audio-element');
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration); // Ensure this line is updating duration
  };


  const handleMouseDown = () => {
    setIsSeeking(true);
  };

  const handleMouseUp = (e) => {
    if (isSeeking) {
      setIsSeeking(false);
      handleSeek(e);
    }
  };

  const handleTouchStart = () => {
    const audio = document.getElementById('audio-element');
    audio.pause()
    setIsSeeking(true);
  };

  const handleTouchEnd = (e) => {
    const audio = document.getElementById('audio-element');
    audio.play()
    if (isSeeking) {
      setIsSeeking(false);
      handleSeek(e);
    }
  };

  const handleTouchMove = (e) => {
    if (isSeeking) {
      handleSeek(e);
    }
  };

  const handleSeek = (e) => {
    const audio = document.getElementById('audio-element');
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


  if (isLoading) return <LoadingSpinner />;

  if (isError) return <NotFound errorDetails={'Error Fetching Data'} />;

  return (
    <div className='h-dvh bg-[#1f2128] overflow-hidden'>

      <div className='flex flex-col justify-between h-dvh'>
        <TopNavigation options={{ left: 'back', center: 'Now Playing' }} />

        <div className="p-4 flex flex-col -mt-5 h-[80%]">
          {audioUrl && <audio id="audio-element" src={audioUrl} onTimeUpdate={handleTimeUpdate} />}
          {/* <div className="relative">
            <img
              src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`}
              alt="album-cover"
              className="rounded-[25px] w-[100vw] h-[95vw] p-[0.4rem] object-cover rounded-full"
            />
          </div> */}

          <div className="cover-wrapper mt-2">
            <img className="cover-shadow" src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} />
            <img className="cover-img" src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} />
          </div>


          <div className="mt-4 text-center flex justify-between items-center px-3">
            <div className='text-left'>
              <h2 className="text-lg font-satoshi font-semibold text-white">{metadata.songName}</h2>
              <p className="text-white text-lg text-[1.1rem] font-satoshi font-light">{metadata.songArtist}</p>
            </div>

            <div id="heart-container" className='mr-[0.4rem]' onClick={()=>handleLikeSong({title: metadata.songName, artist: metadata.songArtist})}>
              <input type="checkbox" id="toggle" checked={isChecked} onChange={handleCheckboxChange}/>
              <div id="twitter-heart" ></div>
            </div>

          </div>
          <div className="mt-4">
            {/* <div
              className="w-full bg-gray-300 h-2 rounded-lg cursor-pointer mb-2"
              onClick={handleSeek}
            >
              <div
                className="h-2 bg-green-500 rounded-lg"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div> */}


            {/* Seekbar */}

            <div className="w-full flex flex-col px-3 z-50 mt-5">
              <input type="range" className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                id="song-percentage-played"
                step="0.1"
                min="0"
                max={duration || ''}
                value={isSeeking ? currentTime : currentTime}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                onChange={() => { }} // Prevent default behavior of onChange for input[type=range]
              />
              {/* <div className="flex w-full justify-between">
                <span className="amplitude-current-time text-xs font-sans tracking-wide font-medium text-sky-500 dark:text-sky-300">{metadata.songName}</span>
                <span className="amplitude-duration-time text-xs font-sans tracking-wide font-medium text-gray-500">{metadata.songArtist}</span>
              </div> */}
            </div>







            <div className="flex justify-between text-gray-400 text-xs font-satoshi font-bold -mt-1 px-4">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>


          <div className='flex items-center justify-center mt-10'>
            <div className='flex justify-around items-center w-[80%]'>
              <RepeatIcon2/>
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
          <UpArrow className='mb-2' onClick={handleToggleModal} />
          <p onClick={handleToggleModal}>Lyrics</p>
        </div>

      </div>



      {/* Modal */}
      {isModalOpen && (
        <div className='fixed h-screen w-screen bg-[#1B1A1A] z-50 top-0'>
          <TopNavigation options={{ left: 'back', center: metadata.songName , backHandler : handleToggleModal}} />
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




      {/* Mini Player */}

      {/* <div className='fixed bottom-[4rem]'>
          <div
            className="relative w-full h-16 bg-cover bg-center"
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoid}/sddefault.jpg)` }}
          >
            <div className="backdrop-blur-xl bg-white/30 h-full flex justify-between items-center w-screen rounded-t-lg">

              <img className='bg-cover w-[3.3rem] h-[3.3rem] ml-[1rem]' src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} alt={metadata.songName} />

              <div className="marquee-container overflow-hidden flex flex-col">
                <p className="marquee-text">
                  <span className="inline-block">{metadata.songName}</span>
                  <span className="inline-block pl-2">•</span>
                  <span className="inline-block pl-2">{metadata.songArtist}</span>
                </p>
              </div>

              <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] '>
                <HeartIcon className="h-6 w-6 cursor-pointer" fill={'#42C83C'} stroke={'#737373'} />
              </div>
              <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] mr-4'>
                <Play className='cursor-pointer' />
              </div>
            </div>
          </div>
        </div> */}





    </div>
  );
};

export default MusicPlayerSlider;
