import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import EmployeeManagement from './pages/EmployeeManagement';
import lg from './assets/lg.gif'; // Loading gif import
import './App.css'
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Done loading
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show loading screen
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff' 
      }}>
        <img src={lg} alt="Loading..." className='loading-gif'/>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={user ? <HomePage /> : <Login />} />
        <Route path="/home/employeemanagement" element={<EmployeeManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
