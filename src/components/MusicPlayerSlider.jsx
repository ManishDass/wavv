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
import Ellipse5 from '../assets/images/Ellipse5.svg?react';
import Ellipse6 from '../assets/images/Ellipse6.svg?react';
import { useAuth } from '../context/AuthContext';
import LyricsAPI from './LyricsAPI';

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

  // To Reset the like button onNewMusic
  useEffect(() => {
    console.log("Video IDx: ", videoid)
    setIsChecked(false)
    // setCurrentTime(0)
  }, [videoid])

  const audioRef = useRef(null);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { likedSongHandler } = useAuth();
  const [isAudioRepeat, setIsAudioRepeat] = useState(false)
  const [lyrics, setLyrics] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      const tempMetaData = JSON.parse(localStorage.getItem('metadata'))
      console.log("XxX: ", tempMetaData)
      const lyricsData = await LyricsAPI(metadata.songArtist, metadata.songName);
      if (lyricsData && lyricsData.lyrics) {
        setLyrics(lyricsData.lyrics);
        console.log("Lyrics: ", lyricsData.lyrics)
      } else {
        setLyrics('Failed to fetch lyrics.');
      }
    };

    fetchLyrics();
  }, [metadata]);

  useEffect(() => {
    const container = containerRef.current;
    const scrollSpeed = 0.5; // Adjust scroll speed as needed

    const scrollLyrics = () => {
      if (container) {
        container.scrollTop += scrollSpeed;
        if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
          container.scrollTop = 0; // Reset scroll position to top
        }
      }
    };

    const interval = setInterval(scrollLyrics, 15); // Adjust interval for smoother scrolling

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [lyrics]);



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
      console.log("Audio Repeat is on: ", isAudioRepeat)
      setTimeout(() => {
        audioRef.current.play();
      }, 1000); // Adjust delay as needed
    }
  };

  const handleAudioRepeat = () => {
    setIsAudioRepeat(prev => !prev)
  }

  return (
    <div className={`fixed h-dvh w-screen bg-[#0F0817] overflow-hidden z-50 ${showMusicPlayerSlider ? 'hidden' : ''}`}>
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
              <div id="heart-container" className='mr-[0.4rem]' onClick={() => likedSongHandler(metadata, !isChecked, true)}>
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


                <div className='relative flex flex-col z-20' onClick={handleAudioRepeat}>
                  <RepeatIcon2 fill={`${isAudioRepeat ? '#62CD5D' : 'white'}`} />
                  <span className={`absolute flex h-[2px] w-[2px] top-6 left-[0.7rem] ${isAudioRepeat ? '' : 'hidden'}`}>
                    <span className="animate-ping absolute inline-flex h-[2px] w-[2px] rounded-full bg-[#62CD5D] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-[2px] w-[2px] bg-[#62CD5D]"></span>
                  </span>
                </div>


                <PreviousIcon2 />
                <div className="absolute w-14 h-14 bg-gradient-to-tr from-[#704fd0] to-[#ad91ff] rounded-full blur-[10px] z-10" />
                <button className="bg-green-500 p-4 -mt-3 focus:outline-none bg-gradient-to-tr from-[#704fd0] to-[#ad91ff] rounded-full z-20" onClick={handlePlayPause}>
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

          <div className='flex text-white text-xs flex-col justify-center items-center font-satoshi font-bold h-[10%] z-20'>
            <UpArrow className='mb-2' onClick={() => setIsModalOpen(!isModalOpen)} />
            <p onClick={() => setIsModalOpen(!isModalOpen)}>Lyrics</p>
          </div>

          <Ellipse5 className='absolute -bottom-6 h-[30%] -right-48 z-10' />
          <Ellipse6 className='absolute -bottom-4 h-[30%] -left-40 z-10' />

        </div>
      )}


      {isModalOpen && (
        <div className='fixed h-dvh w-screen bg-[#0F0817] z-50 top-0'>
          <TopNavigation options={{ left: 'back', center: metadata.songName, backHandler: handleToggleModal }} />





          {/* Lyrics */}
          <div className="relative h-[69%] text-white flex items-center justify-center overflow-hidden mt-4">
            <div
              ref={containerRef}
              className="absolute top-0 left-0 w-full h-full overflow-auto flex items-center justify-center"
              style={{ whiteSpace: 'pre-wrap', paddingTop: '20px' }} // Adjust padding as needed
            >
              <pre className="whitespace-pre-wrap break-words p-4 text-center text-lg font-semibold leading-relaxed mt-20">
                {lyrics}
              </pre>
            </div>
          </div>





          <div className='fixed bottom-0 z-50'>
            {metadata && (
              <div className="relative w-full h-40 bg-purple-800 rounded-[20px] text-white shadow-custom-gray">

                <div className="backdrop-blur-xl bg-[#0F0817]/70 h-full grid grid-cols-12 grid-rows-3 items-center w-screen rounded-t-[20px] pt-2">


                  {/* Thumbnail */}
                  <div className='relative col-span-2'>
                    {/* Below Animated Span Cause too much performace Bottleneck */}
                    {/* <span className="animate-ping absolute inline-flex h-[2.5rem] w-[2.5rem] top-[0.2rem] left-[1.5rem] rounded-full bg-[#62CD5D] opacity-75 z-10"></span> */}
                    <img className='bg-cover w-[2.4rem] h-[2.4rem] ml-[1.4rem] rounded-full border-[1px] border-white relative z-20' src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} alt={metadata.songName} />
                  </div>

                  {/* Metadata with Marquee Behaviour */}
                  <div className="marquee-container overflow-hidden max-w-full flex place-self-center col-span-6 text-sm font-santoshi-bold">
                    <p className="marquee-text whitespace-nowrap">
                      <span className="inline-block">{metadata.songName}</span>
                      <span className="inline-block pl-2">•</span>
                      <span className="inline-block pl-2">{metadata.songArtist}</span>
                    </p>
                  </div>

                  {/* Like Button */}
                  <div className=' rounded-full h-9 w-9 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] place-self-center col-span-2'>
                    <div id="heart-container" className='-mr-[1rem]' onClick={(e) => { e.stopPropagation(); likedSongHandler(metadata, !isChecked); }}>
                      <input type="checkbox" id="toggle" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                      <div id="twitter-heart"></div>
                    </div>
                  </div>

                  {/* Play Pause */}
                  <div className=' rounded-full h-9 w-9 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] mr-4 cursor-pointer place-self-center col-span-2'>
                    {isPlaying ? (
                      <PauseIcon onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} />
                    ) : (
                      <PlayIcon onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} />
                    )}
                  </div>





                  <div className="col-span-12 row-start-2">
                    {/* Seekbar */}
                    <div className="w-full flex flex-col px-6">
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

                    <div className="flex justify-between text-gray-400 text-xs font-satoshi font-bold px-6 -mt-4">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>







                  <div className='flex items-center justify-center col-span-12 row-start-3 -mt-5'>
                    <div className='flex justify-around items-center w-[80%]'>


                      <div className='relative flex flex-col z-20' onClick={handleAudioRepeat}>
                        <RepeatIcon2 fill={`${isAudioRepeat ? '#62CD5D' : 'white'}`} />
                        <span className={`absolute flex h-[2px] w-[2px] top-6 left-[0.7rem] ${isAudioRepeat ? '' : 'hidden'}`}>
                          <span className="animate-ping absolute inline-flex h-[2px] w-[2px] rounded-full bg-[#62CD5D] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-[2px] w-[2px] bg-[#62CD5D]"></span>
                        </span>
                      </div>


                      <PreviousIcon2 />
                      <div className="absolute w-14 h-14 bg-gradient-to-tr from-[#704fd0] to-[#ad91ff] rounded-full blur-[10px] z-10" />
                      <button className="bg-green-500 p-3 -mt-3 focus:outline-none bg-gradient-to-tr from-[#704fd0] to-[#ad91ff] rounded-full z-20" onClick={handlePlayPause}>
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
              </div>
            )}
          </div>











        </div>

      )}

    </div>

  );
};

export default MusicPlayerSlider;