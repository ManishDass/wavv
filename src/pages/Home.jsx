import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuery } from 'react-query';
import fetchUserProfile from '../components/fetchUserProfile';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { error, data, isLoading } = useQuery('userProfile', async () => {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      console.log("UserData from localStorage: ", JSON.parse(storedUserProfile));
      return JSON.parse(storedUserProfile);
    } else {
      const currentUser = JSON.parse(localStorage.getItem('userProfile'));
      if (currentUser) {
        const profile = await fetchUserProfile(currentUser.uid);
        console.log("UserData from Firestore: ", profile);
        return profile;
      }
    }
    return null; // Return null if no data found
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <button className="bg-red-600" onClick={logout}>Logout</button>
      <button onClick={() => navigate('/music')}>Music</button>
      {data && (
        <div>
          <h1>Welcome, {data.name}</h1>
          <p>Email: {data.email}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
