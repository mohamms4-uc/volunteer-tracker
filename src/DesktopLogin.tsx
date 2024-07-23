import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePrivy } from '@privy-io/react-auth';
import uclogo from './uclogo.png';

type PrivyTokenPayload = {
  sid: string;
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
};

const decodeToken = (token: string): PrivyTokenPayload | null => {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload) as PrivyTokenPayload;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};

const DesktopLogin: React.FC = () => {
  const { login, getAccessToken, authenticated, ready } = usePrivy();
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
          navigate("/dashboard");
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

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = localStorage.getItem('accessToken');
      console.log("Current Access Token:", accessToken);

      if (accessToken) {
        const decoded = decodeToken(accessToken);
        if (decoded) {
          const now = Date.now() / 1000;

          if (decoded.exp && decoded.exp > now) {
            setIsAuthenticated(true);
          } else {
            console.log("Token expired or invalid, attempting to refresh");
            try {
              const newAccessToken = await getAccessToken();
              if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken);
                setIsAuthenticated(true);
                navigate("/dashboard"); // Navigate back to login screen on token refresh
              } else {
                setIsAuthenticated(false);
                localStorage.removeItem('accessToken');
                setLoginError('Session expired. Please log in again.'); // Notify user to log in again
              }
            } catch (error) {
              console.error("Error refreshing token:", error);
              setIsAuthenticated(false);
              localStorage.removeItem('accessToken');
              setLoginError('Session expired. Please log in again.'); // Notify user to log in again
            }
          }
        } else {
          console.error("Failed to decode token.");
          setIsAuthenticated(false);
          localStorage.removeItem('accessToken');
          setLoginError('Session expired. Please log in again.'); // Notify user to log in again
        }
      }
    };

    checkToken(); // Initial token check on component mount

    const refreshInterval = setInterval(checkToken, 30000); // Refresh token every 30 seconds

    return () => clearInterval(refreshInterval); // Clean up interval on component unmount
  }, []);

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

export default DesktopLogin;