import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
// import GoogleLogin, { GoogleLogout, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from 'gapi-script';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Homework from './components/pages/Homework';
import Singup from './components/pages/Signup/Singup';
import AccountDisplay from './components/AccountDisplay';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout';


const CLIENT_ID = "459159934137-d9cc5q79n36jboceic59oopenk3kreff.apps.googleusercontent.com";

const jwt = localStorage.getItem('jwt');
  if (!jwt) {

  // Redirect the user to the login page
    console.log("Not Logged")
  }
  if (jwt) {
    console.log("Logged in")
  }

function App() {

  

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: ""
      })
    }

    gapi.load('client:auth2',start)
  });

  return (
      <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Navigate replace to="/home" />} />
          <Route path='/home' element={<Home />}/>
          <Route path="/about" element={<About />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
          <Route path='/logout' element={<Logout />} />
          
        </Routes>
      </Router>
      
      </>
      
  );
}

export default App;
