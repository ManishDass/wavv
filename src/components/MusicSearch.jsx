import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useStore from '../stores/useStore'

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

const useDebouncedEffect = (effect, delay, deps) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};

const MusicSearch = ({ onVideoIdChange, onMusicMetaChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  let navigate = useNavigate();

  const { videoid, userDetails, metadata, darkMode, setVideoid, setUserDetails, setMetadata, toggleDarkMode } = useStore();

  useDebouncedEffect(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  const { data: lastFmData, error: lastFmError, isLoading: lastFmLoading } = useQuery({
    queryKey: ['lastFmMusicData', debouncedSearchTerm],
    queryFn: fetchLastFmMusicData,
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const playSong = async (song) => {
    setCurrentSong(song);

    try {
      const searchTerm = `${song.name} ${song.artist}`;
      const youtubeResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchTerm)}&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`
      );

      if (!youtubeResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const youtubeData = await youtubeResponse.json();
      if (youtubeData.items.length > 0) {
        const firstVideoId = youtubeData.items[0].id.videoId;
        console.log('Playing YouTube song:', song.name, 'by', song.artist);
        console.log("Video ID of Music Search: ", firstVideoId);

        onVideoIdChange(firstVideoId);

        setVideoid(firstVideoId)


        onMusicMetaChange({ songName: song.name, songArtist: song.artist });
        console.log("Move to player")
        navigate('/player', { state: { videoId: firstVideoId } });
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
      {lastFmLoading && <p>Loading...</p>}
      {lastFmError && <p>Last.fm Error: {lastFmError.message}</p>}
      <ul>
        {results.slice(0, 5).map((result, index) => (
          <li
            key={index}
            onClick={() => playSong(result)}
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

