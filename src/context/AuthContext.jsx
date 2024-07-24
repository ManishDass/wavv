// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, app } from '../firebaseConfig';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import useStore from '../stores/useStore'; // Ensure the path is correct
import Avatar, { genConfig } from 'react-nice-avatar'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // const { videoid, userDetails, metadata, setVideoid, setUserDetails, setMetadata, toggleDarkMode } = useStore();

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    return storedLoggedInStatus === 'true';
  });

  const [likedSongs, setLikedSongs] = useState(()=>{
    let tempData = JSON.parse(localStorage.getItem('userProfile')) || [];
    return tempData.likedSongs
})

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const saveUserDataToFirestore = async (user) => {
    const config = genConfig(user.email)
    const newUserProfile = {
      uid: user.uid,
      name: user.displayName || user.email.split('@')[0],
      email: user.email,
      photoURL: user.photoURL || config,
      playlists: [],
      likedSongs: [],
    };


    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      let userProfile;
      if (userDoc.exists()) {
        const existingData = userDoc.data();
        userProfile = {
          ...existingData,
          ...newUserProfile,
          playlists: existingData.playlists || [],
          likedSongs: existingData.likedSongs || []
        };
      } else {
        userProfile = newUserProfile;
      }

      await setDoc(userRef, userProfile, { merge: true });
      // console.log("User profile saved successfully");
      setLikedSongs(userProfile.likedSongs);
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } catch (error) {
      console.error("Error saving user profile: ", error);
    }
  };


  const login = (user) => {
    // console.log("Inside User: ", user)
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    saveUserDataToFirestore(user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
    navigate('/login');
  };


  const fetchDataFromStore = async () => {
    const tempUserProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

    try {
      // Reference to the user document in Firestore
      const userRef = doc(db, 'users', tempUserProfile.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        console.log(userDoc.data());
        return userDoc.data();
      } else {
        return {};
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
    }
  }


  //Save any Specific Data to FireStore
  const saveSpecificToFirestore = async (passedUserProfile, fieldName, data) => {
    try {
      await updateDoc(doc(db, 'users', passedUserProfile.uid), {
        [fieldName]: data
      });
      // console.log(`User ${fieldName} updated successfully`);
      const userProfile = JSON.parse(localStorage.getItem('userProfile')); //Fetching previous Data
      userProfile.likedSongs = data
      // console.log("Fire store updated value: ", userProfile)
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } catch (error) {
      console.error("Error saving user profile: ", error);
    }
  }


  const likedSongHandler = async (metadata, isChecked, musicSliderPage) => {
    // Get the user profile from local storage
    const tempUserProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

    // Initialize previousLikedSongs
    let previousLikedSongs = [];

    try {
      // Reference to the user document in Firestore
      const userRef = doc(db, 'users', tempUserProfile.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // If the document exists, get the likedSongs from Firestore
        previousLikedSongs = userDoc.data().likedSongs || [];
      } else {
        // If the document does not exist, get the likedSongs from local storage
        previousLikedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
      // Fallback to local storage if there's an error
      previousLikedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
    }

    // Log the checkbox status
    console.log("Checkbox Status: ", isChecked);

    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

    if(musicSliderPage && isChecked) {
      console.log("Music Slider and isCHECKED ")
      previousLikedSongs.push(metadata);
      saveSpecificToFirestore(userProfile, 'likedSongs', previousLikedSongs); // Save to Firestore
      setLikedSongs(previousLikedSongs);
    }
    if(musicSliderPage && !isChecked) {
      console.log("Music Slider and isNOTCHECKED ")
      console.log("Previous Liked Songs inside unCheked: ", previousLikedSongs)
      console.log("Metadata inside notChecked: ", metadata)

      const updatedLikedSongs = previousLikedSongs.filter(song => song.songTitle !== metadata.songTitle || song.songArtist !== metadata.songArtist);
      console.log("Updated Liked Songs inside unCheked: ", updatedLikedSongs)
      saveSpecificToFirestore(userProfile, 'likedSongs', updatedLikedSongs); // Save to Firestore
      setLikedSongs(updatedLikedSongs);
    }
    // If the song is not already liked and isChecked is true, add it to likedSongs
    else if (isChecked && !previousLikedSongs.some(song => song.songTitle === metadata.songTitle && song.songArtist === metadata.songArtist)) {
      previousLikedSongs.push(metadata);
      saveSpecificToFirestore(userProfile, 'likedSongs', previousLikedSongs); // Save to Firestore
      setLikedSongs(previousLikedSongs);
    }
    // If isChecked is false, remove the song from likedSongs
    else if (!isChecked) {
      const updatedLikedSongs = previousLikedSongs.filter(song => song.songTitle !== metadata.songTitle || song.songArtist !== metadata.songArtist);
      saveSpecificToFirestore(userProfile, 'likedSongs', updatedLikedSongs); // Save to Firestore
      setLikedSongs(updatedLikedSongs);
    }
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, likedSongHandler, likedSongs, setLikedSongs, saveSpecificToFirestore, fetchDataFromStore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
