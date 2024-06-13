// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';
import TestYT from './pages/TestYT';

const App = () => {
  return (
    <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute/>}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/yt" element={<TestYT />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
