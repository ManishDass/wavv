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

const MusicPlayerSlider = () => {
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
    } = useStore();
  
    const audioRef = useRef(null);
    const [isSeeking, setIsSeeking] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const { likedSongHandler } = useAuth();
  
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
  
    if (isLoading) return <LoadingSpinner />;
  
    if (isError) return <NotFound errorDetails={'Error Fetching Data'} />;
  
    return (
      <div className='h-dvh bg-[#1f2128] overflow-hidden'>
        <div className='flex flex-col justify-between h-dvh'>
          <TopNavigation options={{ left: 'back', center: 'Now Playing' }} />
          <div className="p-4 flex flex-col -mt-5 h-[80%]">
            {audioUrl && <audio id="audio-element" ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} />}
            <button onClick={handlePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div>
              <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MusicPlayerSlider;