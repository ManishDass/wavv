import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState('');

  const toggleSignUp = () => setIsSignUp(!isSignUp);

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
    } catch (error) {
      console.error("Google authentication error:", error.message);
      setError(error.message);
    }
  };

  // Setup reCAPTCHA for phone authentication
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved - will proceed with submit
          console.log(response)
        },
        'expired-callback': () => {
          // Reset reCAPTCHA
        }
      }, auth);
    }
    return window.recaptchaVerifier;
  };

  // Handle phone authentication - send OTP
  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    const appVerifier = setupRecaptcha();

    try {
      const phoneNumber = `+91${phone}`;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      console.log("OTP sent to:", phoneNumber);
    } catch (error) {
      console.error("Phone authentication error:", error.message);
      setError(error.message);
    }
  };

  // Verify OTP and complete phone authentication
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      console.log("User signed in with phone number successfully!");
    } catch (error) {
      console.error("OTP verification error:", error.message);
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      <button onClick={handleGoogleAuth} className="p-2 bg-red-500 text-white mb-2">Sign in with Google</button>
      <form onSubmit={handlePhoneAuth} className="mb-4">
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-2 p-2 border"
        />
        <button type="submit" className="p-2 bg-green-500 text-white">Send OTP</button>
        <div id="recaptcha-container"></div>
      </form>
      {verificationId && (
        <form onSubmit={verifyOtp} className="mb-4">
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-2 p-2 border"
          />
          <button type="submit" className="p-2 bg-yellow-500 text-white">Verify OTP</button>
        </form>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button onClick={toggleSignUp} className="p-2 text-blue-500">
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default AuthPage;
