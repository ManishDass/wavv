import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from '../stores/useStore';

const usePlaySong = () => {
  const YOUTUBE_API_KEY = import.meta.env.VITE_FIREBASE_YOUTUBE_API_KEY;
  const { setVideoid, setMetadata, setIsPlaying, isPlaying, audioUrl } = useStore();
  const [currentSong, setCurrentSong] = useState(null);
  const navigate = useNavigate();

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

        setVideoid(firstVideoId);
        setMetadata({ songName: song.name, songArtist: song.artist });

        if(audioUrl) {
            console.log("Yes Cum")
            setIsPlaying(true); 
            console.log(audioUrl)
        }
        // navigate('/player'); //This line
      } else {
        console.error('No YouTube video found for:', song.name, 'by', song.artist);
      }
    } catch (error) {
      console.error('Failed to fetch YouTube video:', error);
    }
  };

  return { currentSong, playSong };
};

export default usePlaySong;