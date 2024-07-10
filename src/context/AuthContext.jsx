// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, app } from '../firebaseConfig';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
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

  const [likedSongs, setLikedSongs] = useState([])

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
      likedSongs: []
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
      console.log("User profile saved successfully");
      setLikedSongs(userProfile.likedSongs);
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } catch (error) {
      console.error("Error saving user profile: ", error);
    }










    // try {
    //   await setDoc(doc(db, 'users', user.uid), newUserProfile, { merge: true });
    //   console.log("User profile saved successfully");
    //   localStorage.setItem('userProfile', JSON.stringify(newUserProfile));
    // } catch (error) {
    //   console.error("Error saving user profile: ", error);
    // }





  };

  const login = (user) => {
    console.log("Inside User: ", user)
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







  //Save any Specific Data to FireStore
  const saveSpecificToFirestore = async (passedUserProfile, fieldName, data) => {
    try {
      await updateDoc(doc(db, 'users', passedUserProfile.uid), {
        [fieldName]: data
      });
      // console.log(`User ${fieldName} updated successfully`);
      const userProfile = JSON.parse(localStorage.getItem('userProfile')); //Fetching previous Data
      userProfile.likedSongs = data
      console.log("Fire store updated value: ", userProfile)
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } catch (error) {
      console.error("Error saving user profile: ", error);
    }
  }








  const likedSongHandler = (metadata, isChecked) => {
    const previousLikedSongs = JSON.parse(localStorage.getItem('likedSongs')) || []
    console.log("Checkbox Statusx: ", isChecked)

    const userProfile = JSON.parse(localStorage.getItem('userProfile'))
    console.log("Test User ID: ", userProfile.uid)

    if (previousLikedSongs.some(song => song.title === metadata.title && song.artist === metadata.artist) === false && isChecked) {
      previousLikedSongs.push(metadata)
      localStorage.setItem('likedSongs', JSON.stringify(previousLikedSongs))
      console.log(previousLikedSongs)
      saveSpecificToFirestore(userProfile, 'likedSongs', previousLikedSongs); //Save this into firestore
      setLikedSongs(previousLikedSongs)

    }
    else if (!isChecked) {
      console.log("Unchecked")
      const updatedLikedSongs = previousLikedSongs.filter(song => song.title !== metadata.title && song.artist !== metadata.artist)
      console.log("Updated: ", updatedLikedSongs)
      localStorage.setItem('likedSongs', JSON.stringify(updatedLikedSongs))
      saveSpecificToFirestore(userProfile, 'likedSongs', updatedLikedSongs); //Save this into firestore
      setLikedSongs(updatedLikedSongs)
    }
  }


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, likedSongHandler, likedSongs, setLikedSongs }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
