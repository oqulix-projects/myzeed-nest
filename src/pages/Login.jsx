import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig'; // Adjust the path as needed
import logo from '../assets/logo.png';
import log from '../assets/19722.png';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in:', userCredential.user);
      navigate('/'); // Redirect to home when login is successful
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fcfcfc' }}>
      <div className='login-container'>
        <div className='login-left'>
          <img className='left-img' src={log} alt="" />
        </div>
        <div className='login-right'>
          <img className='logo' src={logo} alt="" />
          <h2>Login</h2>
          <div className='input-form'>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id='email'
              placeholder='Eg: hospital@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
