import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useStore from '../stores/useStore'
import BackIcon from '../assets/images/Back.svg?react';
import Search from '../assets/images/Search.svg?react';

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

const MusicSearch = () => {
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

        setVideoid(firstVideoId) //Zustand function

        setMetadata({ songName: song.name, songArtist: song.artist });
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
    <div className='bg-[#1C1B1B] h-screen font-santoshi-regular text-white'>


      {/* Top Navigation Bar */}
      <div className='flex justify-between items-center mt-5 mt-6 px-6'>
        <div className='flex items-center justify-center bg-white bg-opacity-10 h-7 w-7 rounded-full back-button' onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
        <h1 className='font-sans text-md  -ml-5'>Search</h1>
        <div className='flex flex-col gap-[2px]'>
          <div className='rounded-full bg-white h-1 w-1'></div>
          <div className='rounded-full bg-white h-1 w-1'></div>
          <div className='rounded-full bg-white h-1 w-1'></div>
        </div>
      </div>


      <div className="relative flex justify-center items-center pt-8">
        <Search className="absolute left-14 top-[3.9rem] transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Music & Podcasts"
          value={searchTerm}
          onChange={handleSearch}
          autoComplete="email"
          className="
      w-[80%]
      pl-14
      rounded-[30px]
      border border-gray-300 border-opacity-25
      py-5
      bg-[#1B1A1A]
      font-santoshi-regular
      focus:outline-none
      text-[#A6A6A6]
      text-xs
      placeholder-[#A6A6A6]
      focus:border-[#62CD5D]
    "
        />
      </div>


      {/* Old working codes */}
      <div className='flex flex-grow justify-center items-center w-screen px-9 pt-8'>

        {lastFmLoading && <p>Loading...</p>}
        {lastFmError && <p>Last.fm Error: {lastFmError.message}</p>}
        <ul>
          {results.slice(0, 5).map((result, index) => (
            <li
              key={index}
              onClick={() => playSong(result)}
              className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-colors duration-300 text-sm"
            >
              <span className="font-semibold">{result.name}</span> by {result.artist}
              <div className='bg-[#62CD5D] h-[2px] mt-4'></div>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default MusicSearch;

