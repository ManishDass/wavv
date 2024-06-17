import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeMute, faVolumeUp, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import useStore from '../stores/useStore'
import coverImage from '../assets/coverArt.jpg';

const fetchAudioUrl = async (videoId) => {
  const response = await axios.get(`https://wavv-server.vercel.app/youtube/${videoId}`, { responseType: 'blob' });
  const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
  return URL.createObjectURL(audioBlob);
};

const MusicPlayerSlider = () => {
  const {videoid, metadata} = useStore()
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  const { data: audioUrl, isLoading, isError } = useQuery(['audioUrl', videoid], () => fetchAudioUrl(videoid));

  const handlePlayPause = () => {
    const audio = document.getElementById('audio-element');
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    setIsPlaying(!isPlaying);
};

  return (
    <div className="bg-black text-white flex items-center justify-center min-h-screen">
    <audio id="audio-element" src={audioUrl}  />
      <div className="w-96 bg-gray-900 rounded-xl p-4">
        <div className="relative">
          <img src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} alt="album-cover" className="rounded-xl" />
          <button className="absolute top-4 left-4 bg-gray-800 rounded-full p-2 focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div className="absolute top-4 right-4">
            <button className="bg-gray-800 rounded-full p-2 focus:outline-none">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">{metadata.songName}</h2>
          <p className="text-gray-400">{metadata.songArtist}</p>
        </div>
        <div className="mt-4">
          <input type="range" min="0" max="100" value="60" className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
          <div className="flex justify-between text-gray-400 text-sm mt-1">
            <span>2:25</span>
            <span>4:02</span>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <button className="bg-gray-800 p-2 rounded-full focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6"></path>
            </svg>
          </button>
          <button className="bg-green-500 p-4 rounded-full focus:outline-none" onClick={handlePlayPause}>
          {isPlaying ? <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6"></path>
            </svg>  : <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-4.546-2.623A1 1 0 009 9.382v5.236a1 1 0 001.206.972l4.546-2.623a1 1 0 000-1.736z"></path>
            </svg>}
            
          </button>
          <button className="bg-gray-800 p-2 rounded-full focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m0 0l3 3m-3-3l3-3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayerSlider