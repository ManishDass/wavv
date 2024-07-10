import { useState, useEffect } from 'react';
import { auth, app } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../assets/images/Back.svg?react';
import Logo from '../assets/LogoWithText.svg';
import Google from '../assets/images/Google.svg?react';
import Apple from '../assets/images/Apple.svg?react';
import Line1 from '../assets/images/Line1.svg?react';
import Line2 from '../assets/images/Line2.svg?react';
import useDarkMode from '../hooks/useDarkMode';
import { collection, query, where, getDoc, doc, getFirestore } from "firebase/firestore";
 

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const AuthPage = ({ loginMode }) => {
  useDarkMode(); //add or remove dark mode according to device-color-scheme
  const [isSignUp, setIsSignUp] = useState(loginMode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();
  const firestore = getFirestore(app);


  const toggleSignUp = () => setIsSignUp(!isSignUp);

  const { login } = useAuth();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser);
        console.log("Verification email sent to:", userCredential.user.email);
        login(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully!");
        login(userCredential.user);
        navigate('/home');
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      setError(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in with Google successfully!");
      login(result.user);
      navigate('/home');
    } catch (error) {
      console.error("Google authentication error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className='flex flex-col justify-around items-center h-dvh overflow-hidden test bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.0))]'>
      {/* Back Button */}
      <div className='flex items-center justify-center bg-white bg-opacity-10 h-7 w-7 rounded-full back-button absolute top-5 left-5' onClick={() => navigate(-1)}>
        <BackIcon />
      </div>

      <img src={Logo} className='bg-cover bg-no-repeat h-10' alt='logo' />

      <h1 className='text-white text-3xl mt-6'>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <p className='text-white text-xs font-santoshi-light -mt-4'>If You Need Any Support <a href='#' className='text-[#62CD5D]'>Click Here</a></p>
      {error && <p className="text-red-500 mt-2 text-center relative -mt-5 -mb-5">{error}</p>}
      <form onSubmit={handleEmailAuth} className='flex flex-col gap-9'>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className='
          rounded-[30px]
          border border-gray-300 border-opacity-25
          py-6
          px-10
          bg-[#1B1A1A]
          font-santoshi-regular
          focus:outline-none
          text-[#A6A6A6]
          placeholder-[#A6A6A6]
          focus:border-blue-500' />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="password"
          className='
          -mt-5
          rounded-[30px]
          border border-gray-300 border-opacity-25
          py-6
          px-10
          font-santoshi-regular
          bg-[#1B1A1A]
          text-[#A6A6A6]
          placeholder-[#A6A6A6]
          focus:outline-none
          focus:border-blue-500' />


        <h1 className='text-white text-xs font-santoshi-regular justify-start -mt-4 ml-4'>Recovery Password</h1>
        <button type='submit' className='bg-[#62CD5D] text-white px-[7.8rem] py-5 rounded-[30px] -mt-4'>{isSignUp ? "Sign Up" : "Sign In"}</button>

      </form>



      <div className='flex justify-center items-center gap-2 -mt-5'>
        <Line1 />
        <p className='text-white font-santoshi-light text-xs'>Or</p>
        <Line2 />
      </div>

      <div className='flex justify-center items-center gap-12 -mt-3'>
        <Google className='mt-2' onClick={handleGoogleAuth} />
        <Apple />
      </div>

      <p className='text-white text-xs font-santoshi-regular mt-2 mb-6'> {isSignUp ? 'Already A Member ?' : 'Not A Member ?'} <a href='#' className='text-[#278CE8]' onClick={toggleSignUp}>{isSignUp ? 'Sign In Now' : 'Register Now'}</a></p>

    </div>

    // <div className="min-h-screen flex items-center justify-center bg-black">
    //   <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
    //     <h2 className="text-2xl font-bold mb-4 text-center">{isSignUp ? "Sign Up" : "Sign In"}</h2>
    //     <form onSubmit={handleEmailAuth} className="mb-4">
    //       <input
    //         type="email"
    //         placeholder="Enter Username Or Email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 placeholder-gray-400 rounded"
    //         autoComplete="email"
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 placeholder-gray-400 rounded"
    //         autoComplete="current-password"
    //       />
    //       <button type="submit" className="w-full p-2 bg-green-500 rounded hover:bg-green-600">{isSignUp ? "Sign Up" : "Sign In"}</button>
    //     </form>
    //     <div className="flex justify-center mb-4">
    //       <button onClick={handleGoogleAuth} className="p-2 bg-red-500 rounded w-full mb-2">Sign in with Google</button>
    //     </div>
    //     {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    //     <p className="text-center">
    //       {isSignUp ? "Already have an account? " : "Don't have an account? "}
    //       <button onClick={toggleSignUp} className="text-blue-500">
    //         {isSignUp ? "Sign In" : "Sign Up"}
    //       </button>
    //     </p>
    //     <div className="text-center mt-4">
    //       <a href="#" className="text-green-500">If You Need Any Support Click Here</a>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AuthPage;
