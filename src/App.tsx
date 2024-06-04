import React from 'react';
import './App.css';
import './index.css'
import { usePrivy } from '@privy-io/react-auth';
import uclogo from './uclogo.png';

function App() {
  const { login, logout } = usePrivy();

  return (
    <>
      <div>
      <h1 style={{ color: 'red' }}>Welcome to the UC Volunteer Tracker</h1>
      <img src={uclogo} style={{ width: '150px', height: '150px' }} />
        <div className="card">
          <div className="button">
          <button onClick={login}>
            Login
          </button>
          <button onClick={logout}>
            Logout
          </button>
        </div>
      </div>
        <p style={{ color: 'black' }} className="welcome">
          Login to get started.
        </p>
      </div>
    </>
  );
}

export default App;
