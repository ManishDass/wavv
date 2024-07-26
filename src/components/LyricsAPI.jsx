import axios from 'axios';

const lyrics = axios.create({
  baseURL: 'https://api.lyrics.ovh/v1',
});

const LyricsAPI = async (artist, title) => {
  try {
    const res = await lyrics.get(`/${artist}/${title}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
};

export default LyricsAPI;