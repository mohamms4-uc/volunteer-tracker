import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrivy } from '@privy-io/react-auth';
import uclogo from './uclogo.png';
import axios from 'axios';

const HomePage: React.FC = () => {
  const { login, getAccessToken, authenticated, ready, user } = usePrivy();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      await login();
      if (ready && authenticated) {
        const accessToken = await getAccessToken();
        if (accessToken) {
          console.log("Access Token:", accessToken);
          localStorage.setItem('accessToken', accessToken);
          setIsAuthenticated(true);

          // Redirect to /Hours after setting the access token
          navigate("/Hours");
        } else {
          console.error("Failed to retrieve access token.");
          setLoginError('Failed to retrieve access token.');
        }
      } else {
        console.log("User is not authenticated or ready");
        setLoginError('User is not authenticated or ready.');
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoginError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div>
      <h1 style={{ color: 'red' }}>Welcome to the UC Volunteer Tracker</h1>
      <img src={uclogo} style={{ width: '150px', height: '150px' }} alt="UC Logo" />
      <div className="button">
        <button onClick={handleLogin}>
          Login
        </button>
      </div>
      <p style={{ color: 'black' }} className="welcome">
        Login to get started.
      </p>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default HomePage;
