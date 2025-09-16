import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.png';
import { auth } from '../../firebaseConfig'; // Import Firebase auth
import './HomePage.css';
import img1 from '../assets/18771.jpg';
import Cards from '../components/Cards';

const HomePage = () => {


  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='main-div'>
          <img className='home-img' src={logo} alt="" />
          <p className='home-text'>Your gateway to a suite of smart, purpose-built applications.</p>
          <p className='home-tagline'>Crafted with care. Powered by Oqulix.</p>
        </div>
        <div className='img-div'>
          <img style={{ width: '80%' }} src={img1} alt="" />
        </div>
      </div>
      <div className='card-container'>
        <Cards />
      </div>
    </>
  );
};

export default HomePage;
