// import React from 'react';
import './App.css';
import './index.css'
// import { usePrivy } from '@privy-io/react-auth';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import Hours from './Hours.jsx';
import Header from './Components/RedHeader.tsx';
import Sidebar from './Components/Sidebar.tsx';
import DesktopLogin from './DesktopLogin.tsx';


function App() {
  // const { login } = usePrivy();

  return (
    <>
      <div>
      {/* <h1 style={{ color: 'red' }}>Welcome to the UC Volunteer Tracker</h1>
      <img src={uclogo} style={{ width: '150px', height: '150px' }} /> */}
        <div >
          <Routes>
            <Route path='/mobilelogin' element={<HomePage />}/>
            <Route path='/hours' element={<Hours/>}/>
            <Route path="/dashboard" element={<Header />} />
            <Route path="/sideBar" element={<Sidebar />} />
            <Route path="/login" element={<DesktopLogin />} />

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
