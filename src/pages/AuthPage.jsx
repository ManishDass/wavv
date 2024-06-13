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

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate()

  const toggleSignUp = () => setIsSignUp(!isSignUp);

  const { login } = useAuth();

  // Handle email/password authentication
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Send email verification
        await sendEmailVerification(auth.currentUser);
        console.log("Verification email sent to:", userCredential.user.email);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully!");
        login();
        console.log("login called")
        navigate('/')
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      setError(error.message);
    }
  };

  // Handle Google authentication
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google successfully!");
      login();
      navigate('/')
    } catch (error) {
      console.error("Google authentication error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleEmailAuth} className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border"
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border"
          autoComplete="current-password"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      <button onClick={handleGoogleAuth} className="p-2 bg-red-500 text-white mb-2">Sign in with Google</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button onClick={toggleSignUp} className="p-2 text-blue-500">
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default AuthPage;
