// import React from 'react';
import './App.css';
import './index.css'
// import { usePrivy } from '@privy-io/react-auth';
// import uclogo from './uclogo.png';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.js';
import Hours from './Hours.js';


function App() {
  // const { login } = usePrivy();

  return (
    <>
      <div>
      {/* <h1 style={{ color: 'red' }}>Welcome to the UC Volunteer Tracker</h1>
      <img src={uclogo} style={{ width: '150px', height: '150px' }} /> */}
        <div className="card">
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/hours' element={<Hours/>}/>

          </Routes>
          {/* <div className="button">
          <button onClick={login}>
            Login
          </button>
        </div> */}
      </div>
        {/* <p style={{ color: 'black' }} className="welcome">
          Login to get started.
        </p> */}
      </div>
    </>
  );
}

export default App;
