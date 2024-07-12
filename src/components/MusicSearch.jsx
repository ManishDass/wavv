import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useStore from '../stores/useStore'
import BackIcon from '../assets/images/Back.svg?react';
import Search from '../assets/images/Search.svg?react';
import TopNavigation from './TopNavigation';
import useDarkMode from '../hooks/useDarkMode';
const LAST_FM_API_KEY = import.meta.env.VITE_FIREBASE_LAST_FM_API_KEY;
import usePlaySong from '../hooks/usePlaySong'
import HeartIcon from '../assets/images/HeartIcon.svg?react';
import Play from '../assets/images/Play.svg?react';
import Playlist from './Playlist';


// Fetching last fm music data
const fetchLastFmMusicData = async ({ queryKey }) => {
  const [_, query] = queryKey;
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${LAST_FM_API_KEY}&format=json`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseBody = response.json()
  console.log("LAST FM: ", responseBody)
  return responseBody;
};

const useDebouncedEffect = (effect, delay, deps) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};


const MusicSearch = ({showMusicSlider}) => {
  const { playSong } = usePlaySong()
  useDarkMode(); //add or remove dark mode according to device-color-scheme
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
      console.log("Result: ", fuzzyResults)
      setResults(fuzzyResults.map(result => result.item));
    }
  }, [lastFmData, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div className='bg-[#0F0817]/90 h-dvh font-santoshi-regular'>


      {/* Top Navigation Bar */}
      <TopNavigation options={{ left: 'back', center: 'logo', onBack: 'home' }} />

      <div className="relative flex justify-center items-center pt-8">
        <Search className="absolute left-14 top-[3.6rem] transform -translate-y-1/2 text-gray-400" />
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
      py-4
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
<Playlist items={results} mb={7.5} heading={'Search Result'} />

    </div>
  );
};

export default MusicSearch;

