// App.js
import React, { useState } from 'react';
import MusicPlayerSlider from './components/MusicPlayerSlider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';
import MusicSearch from './components/MusicSearch'
import AudioTest from './components/AudioTest';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  const [videoId, setVideoId] = useState('');
  const [musicMetaData, setMusicMetaData] = useState({});

  const handleVideoIdChange = (newVideoId) => {
    setVideoId(newVideoId);
  };

  const handleMetaDataChange = (newMusicMeta) => {
    setMusicMetaData(newMusicMeta);
  };

  return (
    <Router>
      <ChakraProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/player" element={<MusicPlayerSlider videoId={videoId} musicMetaData={musicMetaData} />} />
            <Route path="/music" element={<MusicSearch onVideoIdChange={handleVideoIdChange} onMusicMetaChange={handleMetaDataChange} />} />
          </Route>

          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/test" element={<AudioTest videoId={videoId} musicMetaData={musicMetaData}  />} />

        </Routes>
      </AuthProvider>
      </ChakraProvider>
    </Router>
  );
};

export default App;
