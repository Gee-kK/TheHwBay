import React, { useState } from 'react';
import './Signup.css'

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Check if the username is already taken
      const resUsername = await fetch(`/api/check-username?username=${username}`);
      if (!resUsername.ok) {
        setError("Sorry, that username is taken.");
        setIsLoading(false);
        return;
      }

      // Check if the email is already taken
      const resEmail = await fetch(`/api/check-email?email=${email}`);
      if (!resEmail.ok) {
        setError("Sorry, that email is already registered.");
        setIsLoading(false);
        return;
      }

      // If the username and email are available, submit the form
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      // Handle successful signup
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='signup'>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name</label>
        <br />
        <input
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <br />
        <br />

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


        <button type="submit" disabled={isLoading} id='signupButton' >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      </div>
    </>
  );
}

export default Signup;