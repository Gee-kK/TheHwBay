import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';
// import GoogleLogin, { GoogleLogout } from 'react-google-login';
import '../../../App.css'
import './Login.css'
import LoginComponent from "../../LoginComp";

// export const isLoggedIn = () => {
//   const jwt = localStorage.get('jwt');
//   return !!jwt;
// }



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  // const [username, setUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    axios.post('/api/login', { email, password })
    .then(response => {
    // Store the JWT in local storage
    localStorage.setItem('jwt', response.data.token);
    localStorage.setItem('username', response.data.username);
    // redirect the user to a protected page
    history('/home');
    window.location.reload()
  })
  .catch(error => {
    console.error(error);
  });

    try {
      // Send a request to the server to check if the email and password are correct
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      // Handle successful login
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsLoading(false);
      history('/home');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='login'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <br />
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p>{error}</p>}

          <br />
          <br />

          <button type="submit" disabled={isLoading} id="loginButtonPage">
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;



{/* <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      /> */}

{/* <GoogleLogout
  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
  buttonText="Logout"
  onLogoutSuccess={onFailure}
/> */}