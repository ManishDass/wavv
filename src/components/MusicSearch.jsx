import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import useSWR from 'swr';
import { useQuery } from 'react-query';
import Test from './MusicPlayerSlider';
import { useNavigate } from 'react-router-dom';

const LAST_FM_API_KEY = import.meta.env.VITE_FIREBASE_LAST_FM_API_KEY;
const YOUTUBE_API_KEY = import.meta.env.VITE_FIREBASE_YOUTUBE_API_KEY;


const fetchLastFmMusicData = async ({ queryKey }) => {
  const [_, query] = queryKey;
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${LAST_FM_API_KEY}&format=json`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


const fetchYouTubeMusicData = async ({ queryKey }) => {
  const [_, searchTerm] = queryKey;
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchTerm)}&maxResults=5&type=video&key=${YOUTUBE_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useDebouncedEffect = (effect, delay, deps) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};


const MusicSearch = ({ onVideoIdChange,onMusicMetaChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);;
  const [id, setId] = useState('kTJczUoc26U')
  let navigate = useNavigate();


  useDebouncedEffect(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  const { data: lastFmData, error: lastFmError, isLoading: lastFmLoading } = useQuery({
    queryKey: ['lastFmMusicData', debouncedSearchTerm],
    queryFn: fetchLastFmMusicData,
    enabled: debouncedSearchTerm.length > 0,
  });

  const { data: youTubeData, error: youTubeError, isLoading: youTubeLoading } = useQuery({
    queryKey: ['youTubeMusicData', debouncedSearchTerm],
    queryFn: fetchYouTubeMusicData,
    enabled: debouncedSearchTerm.length > 0,
  });

  useEffect(() => {
    if (lastFmData && lastFmData.results && lastFmData.results.trackmatches && lastFmData.results.trackmatches.track) {
      const fuse = new Fuse(lastFmData.results.trackmatches.track, {
        keys: ['name', 'artist'],
        threshold: 0.3,
      });
      const fuzzyResults = fuse.search(searchTerm);
      setResults(fuzzyResults.map(result => result.item));
    }
  }, [lastFmData, searchTerm]);

  useEffect(() => {
    if (youTubeData && youTubeData.items) {
      const youtubeResults = youTubeData.items.map(item => ({
        name: item.snippet.title,
        artist: item.snippet.channelTitle,
        videoId: item.id.videoId,
      }));
      const fuse = new Fuse(youtubeResults, {
        keys: ['name', 'artist'],
        threshold: 0.3,
      });
      const fuzzyResults = fuse.search(searchTerm);
      setResults(prevResults => [...prevResults, ...fuzzyResults.map(result => result.item)]);
    }
  }, [youTubeData, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };




  const playSong = async (song) => {
    setCurrentSong(song);

    // If it's from Last.fm or any other source without videoId, fetch from YouTube based on song name and artist
    try {
      const searchTerm = `${song.name} ${song.artist}`;
      const youtubeResponse = await fetchYouTubeMusicData({ queryKey: [null, searchTerm] });
      if (youtubeResponse.items.length > 0) {
        const firstVideoId = youtubeResponse.items[0].id.videoId;
        console.log('Playing YouTube song:', song.name, 'by', song.artist);
        // window.open(`https://www.youtube.com/watch?v=${firstVideoId}`, '_blank'); dont remove this line
        console.log("Video ID of Music Search: ", firstVideoId)
        setId(firstVideoId)
        onVideoIdChange(firstVideoId);
        onMusicMetaChange({songName: song.name, songArtist: song.artist})
        // navigate('/player', { state: 'kTJczUoc26U' });
        navigate('/test', { state: 'kTJczUoc26U' });
      } else {
        console.error('No YouTube video found for:', song.name, 'by', song.artist);
      }
    } catch (error) {
      console.error('Failed to fetch YouTube video:', error);
    }

  };



  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song, artist, or lyrics"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-2 p-2 border"
      />
      {(lastFmLoading || youTubeLoading) && <p>Loading...</p>}
      {lastFmError && <p>Last.fm Error: {lastFmError.message}</p>}
      {youTubeError && <p>YouTube Error: {youTubeError.message}</p>}
      {/* <audio controls>
        <source src={mp3data} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> */}
      <ul>
        {results.slice(0, 5).map((result, index) => (
          <li
            key={index}
            onClick={() => playSong(result)} // Call playSong function with the selected song
            className="p-2 border rounded hover:bg-gray-100 cursor-pointer transition-colors duration-300"
          >
            <span className="font-semibold">{result.name}</span> by {result.artist}
          </li>
        ))}
      </ul>
 
    </div>
  );
};

export default MusicSearch;
