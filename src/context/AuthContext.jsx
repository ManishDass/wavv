// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import useStore from '../stores/useStore'; // Ensure the path is correct
import Avatar, { genConfig } from 'react-nice-avatar'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const { videoid, userDetails, metadata, setVideoid, setUserDetails, setMetadata, toggleDarkMode } = useStore();

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    return storedLoggedInStatus === 'true';
  });

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const saveUserDataToFirestore = async (user) => {
    const config = genConfig('manish') 
    const userProfile = {
      uid: user.uid,
      name: user.displayName || user.email.split('@')[0],
      email: user.email,
      
      photoURL: user.photoURL || config,
      playlists: [],
      likedSongs: []
    };

    try {
      await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });
      console.log("User profile saved successfully");
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } catch (error) {
      console.error("Error saving user profile: ", error);
    }
  };

  const login = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    saveUserDataToFirestore(user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
