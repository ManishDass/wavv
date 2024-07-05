// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';
import MusicSearch from './components/MusicSearch';
import MusicPlayer from './components/MusicPlayer';
import LoadingScreen from './components/LoadingScreen';
import GetStartedPage from './pages/GetStartedPage';
import ChooseColorModePage from './pages/ChooseColorModePage';
import RegisterOrSignInPage from './pages/RegisterOrSignInPage';
import MusicPlayerSlider from './components/MusicPlayerSlider';
import Discover from './components/Discover';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState('');
  const [musicMetaData, setMusicMetaData] = useState({});
  const [preSelected, setPreSelected] = useState('home');

  const handleVideoIdChange = (newVideoId) => {
    setVideoId(newVideoId);
  };

  const handleMetaDataChange = (newMusicMeta) => {
    setMusicMetaData(newMusicMeta);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/get-started" />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/choose-color-mode" element={<ChooseColorModePage />} />
          <Route path="/register-or-sign-in" element={<RegisterOrSignInPage />} />
          <Route path="/login" element={<AuthPage loginMode="signin" />} />
          <Route path="/register" element={<AuthPage loginMode="signup" />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><MusicSearch/></PrivateRoute>} />
          <Route path="/discover" element={<PrivateRoute><Discover/></PrivateRoute>} />
          <Route path="/homepage" element={<PrivateRoute><HomePage/></PrivateRoute>} />
          <Route path="/player" element={<PrivateRoute><MusicPlayerSlider/></PrivateRoute>} />
          <Route path="/test" element={<MusicPlayerSlider/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
