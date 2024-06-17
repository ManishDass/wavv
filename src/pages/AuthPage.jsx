import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleEmailAuth} className="mb-4">
          <input
            type="email"
            placeholder="Enter Username Or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 placeholder-gray-400 rounded"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 placeholder-gray-400 rounded"
            autoComplete="current-password"
          />
          <button type="submit" className="w-full p-2 bg-green-500 rounded hover:bg-green-600">{isSignUp ? "Sign Up" : "Sign In"}</button>
        </form>
        <div className="flex justify-center mb-4">
          <button onClick={handleGoogleAuth} className="p-2 bg-red-500 rounded w-full mb-2">Sign in with Google</button>
        </div>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        <p className="text-center">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button onClick={toggleSignUp} className="text-blue-500">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
        <div className="text-center mt-4">
          <a href="#" className="text-green-500">If You Need Any Support Click Here</a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
