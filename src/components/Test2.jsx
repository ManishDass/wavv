// src/YouTubeAudioPlayer.js
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const YouTubeAudioPlayer = ({ videoId, musicMetaData }) => {
  const [audioData, setAudioData] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    console.log("Video ID: ", videoId)
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.22:3000/youtube/${videoId}`);
        const data = await response.json();
        setAudioData(data);
        console.log(musicMetaData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [videoId]);

  const handlePlayPause = (event) => {
    console.log("Play Pause Called")

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleReset = () => {
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (event) => {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / progressBar.offsetWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!audioData) {
    return <div>Loading Ho RHa...</div>;
  }

  const duration = audioRef.current ? audioRef.current.duration : 0;


  const handleDownload = async () => {
    try {
      const response = await fetch(`http://192.168.1.22:3000/youtube/${videoId}/download`);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${audioData.songName}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Optionally revoke the URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error handling download:', error);
    }
  };



  return (
    <div>
      <audio
        ref={audioRef}
        src={`data:audio/mpeg;base64,${audioData.audioBase64}`}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* <div className="w-[100vw] h-[100vh] relative bg-red-900 overflow-hideen">
        <div className="flex justify-center">
          <img
            className="mt-[89px] rounded-[30px] shadow object-cover"
            src={audioData.albumCoverUrl}
            alt="Album Cover"
            style={{ width: '80vw', height: '80vw', maxWidth: '400px', maxHeight: '400px' }}
          />
        </div>
        <div className="left-[28px] top-[476px] absolute text-neutral-200 text-xl font-bold font-['Satoshi']">{musicMetaData.songName}</div>
        <div className="left-[28px] top-[509px] absolute text-zinc-400 text-xl font-normal font-['Satoshi']">{musicMetaData.songArtist}</div>


        <div className="left-[27px] top-[600px] absolute text-zinc-500 text-xs font-bold font-['Satoshi']">{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</div>
        <div className="left-[332px] top-[600px] absolute text-zinc-500 text-xs font-bold font-['Satoshi']">{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</div>


        <div className="absolute top-[580px] left-10 w-9/12 border-2 border-zinc-500/opacity-30" onClick={handleSeek} style={{ pointerEvents: 'auto' }} />
        <div className="absolute top-[580px] left-10 border-4 border-zinc-400" style={{ width: `${(currentTime / duration) * 100}%`, pointerEvents: 'none', maxWidth: 'calc(100% - 2.5rem)' }} />
        <div className="absolute top-[575px] bg-zinc-400 rounded-full w-4 h-4" style={{ left: `calc(2.5rem + ${(currentTime / duration) * 100}% - 0.5rem)`, pointerEvents: 'none' }} />

        <div
          className="w-[72px] h-[72px] left-[160px] top-[662px] absolute bg-green-500 rounded-full flex items-center justify-center cursor-pointer m-0 p-0"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zM14 5v14h4V5h-4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

      </div> */}

      
    </div>
  );
};

export default YouTubeAudioPlayer;
