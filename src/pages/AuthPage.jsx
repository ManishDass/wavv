import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../assets/images/Back.svg?react';
import Logo from '../assets/LogoWithText.svg';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const AuthPage = ({loginMode}) => {
  const [isSignUp, setIsSignUp] = useState(loginMode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

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
    <div className='flex flex-col justify-center items-center h-screen overflow-hidden test bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.7))] '>
    {/* Back Button */}
    <div className='flex items-center justify-center bg-white bg-opacity-10 h-7 w-7 rounded-full back-button absolute top-5 left-5' onClick={()=>navigate(-1)}>
      <BackIcon />
    </div>

    <img src={Logo} className='bg-cover bg-no-repeat h-16 mb-10 -mt-40' alt='logo' />

    <h1 className='text-white'>Sign In</h1>
    <p className='text-white'>If You Need Any Support <a href='#' className='text-green-500'>Click Here</a></p>

    <input type='text'/>
    <br/>
    <input type='password'/>
    <h1 className='text-white'>Recovery Password</h1>
    <button className='bg-[#62CD5D] text-white px-24 py-4 rounded-[20px] mb-14' onClick={() => navigate('/register')}>Sign In</button>

    <p className='text-white'> Not A Member ? <a href='#' className='text-blue-500'>Register Now</a></p>

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
