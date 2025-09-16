import React, { useEffect, useState } from 'react';
import './Navbar.css';
import OQ from '../assets/OQ.png';
import { auth, db } from '../../firebaseConfig'; // adjust path as needed
import { doc, getDoc } from 'firebase/firestore';
import { fetchUserDetails } from '../services/fetchUserData';

const Navbar = ({companyDetails}) => {
  console.log(companyDetails);
  
  const [userEmail, setUserEmail] = useState('');
  console.log(userEmail);
  
  const [userName, setUserName] =useState('')
  const [companyName, setCompanyName] = useState('');

useEffect(() => {
  const loadUser = async () => {    
    const data = await fetchUserDetails();
      setUserEmail(data.email);
      setCompanyName(data.companyName);
      setUserName(data.adminName);
  };

  loadUser();
}, []);



  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = '/'; // Redirect to login
  };

  return (
    <>
      <div className='nav-container'>
        <div><img src={OQ} alt=""  /></div>
        <p className='user-name-nav'><i className="fa-solid fa-circle-user"></i> {userName ||'UserName'}</p>
        <div><button className='logout' onClick={handleLogout}>Logout</button></div>
      </div>
              <h3 style={{margin:'10px'}}>{companyName || 'Company'}</h3>

    </>
  );
};

export default Navbar;
