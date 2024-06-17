// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useQuery } from 'react-query';
// import fetchUserProfile from '../components/fetchUserProfile';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const { error, data, isLoading } = useQuery('userProfile', async () => {
//     const storedUserProfile = localStorage.getItem('userProfile');
//     if (storedUserProfile) {
//       console.log("UserData from localStorage: ", JSON.parse(storedUserProfile));
//       return JSON.parse(storedUserProfile);
//     } else {
//       const currentUser = JSON.parse(localStorage.getItem('userProfile'));
//       if (currentUser) {
//         const profile = await fetchUserProfile(currentUser.uid);
//         console.log("UserData from Firestore: ", profile);
//         return profile;
//       }
//     }
//     return null; // Return null if no data found
//   });

//   // Handle loading state
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // Handle error state
//   if (error) {
//     return <div>Error fetching data: {error.message}</div>;
//   }

//   return (
//     <div>
//       <button className="bg-red-600" onClick={logout}>Logout</button>
//       <button onClick={() => navigate('/music')}>Music</button>
//       {data && (
//         <div>
//           <h1>Welcome, {data.name}</h1>
//           <p>Email: {data.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;




import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaHome, FaPodcast, FaHeart, FaUser } from 'react-icons/fa';
import MusicSearch from '../components/MusicSearch';

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      setUserData(JSON.parse(storedUserProfile));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="relative bg-black text-white min-h-screen">
      <div className={`p-4 ${isSearchVisible ? 'blur-md' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <FaSearch className="text-xl cursor-pointer" onClick={toggleSearch} />
          <h1 className="text-2xl font-bold">Spotify</h1>
          <div className="flex items-center space-x-4">
            <img src={userData.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full" />
            <button onClick={logout} className="text-sm">Logout</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4">
          <div className="mb-6">
            <img src="../assets/image.jpg" alt="Album" className="w-full rounded-lg" />
            <div className="mt-2">
              <h2 className="text-lg font-bold">Happier Than Ever</h2>
              <p>Billie Eilish</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            <button className="border-b-2 border-green-500">News</button>
            <button>Video</button>
            <button>Artists</button>
            <button>Podcasts</button>
          </div>

          {/* News Section */}
          <div className="flex space-x-4 overflow-x-auto mb-6">
            <div className="flex-shrink-0 w-40">
              <img src="../assets/image.jpg" alt="Bad Guy" className="w-full rounded-lg" />
              <p className="mt-2">Bad Guy</p>
              <p className="text-sm text-gray-500">Billie Eilish</p>
            </div>
            <div className="flex-shrink-0 w-40">
              <img src="../assets/image.jpg" alt="Scorpion" className="w-full rounded-lg" />
              <p className="mt-2">Scorpion</p>
              <p className="text-sm text-gray-500">Drake</p>
            </div>
            <div className="flex-shrink-0 w-40">
              <img src="../assets/image.jpg" alt="WH" className="w-full rounded-lg" />
              <p className="mt-2">WH</p>
              <p className="text-sm text-gray-500">Billie Eilish</p>
            </div>
          </div>

          {/* Playlist Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Playlist</h2>
            {userData.playlists.length > 0 ? (
              userData.playlists.map((playlist, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <div>
                    <p>{playlist.name}</p>
                    <p className="text-sm text-gray-500">{playlist.artist}</p>
                  </div>
                  <p>{playlist.duration}</p>
                </div>
              ))
            ) : (
              <p>No playlists available</p>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex justify-around">
          <FaHome className="text-xl" />
          <FaPodcast className="text-xl" />
          <FaHeart className="text-xl" />
          <FaUser className="text-xl" />
        </div>
      </div>

      {/* Search Component */}
      {isSearchVisible && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-4 rounded-lg w-3/4 relative">
            <button
              onClick={toggleSearch}
              className="absolute top-2 right-2 text-black text-xl"
            >
              &times;
            </button>
            <MusicSearch
              onVideoIdChange={(videoId) => console.log("Video ID:", videoId)}
              onMusicMetaChange={(meta) => console.log("Music Meta:", meta)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
