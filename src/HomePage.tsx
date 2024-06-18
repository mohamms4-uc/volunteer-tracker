import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, usePrivy } from '@privy-io/react-auth';
import uclogo from './uclogo.png';

function HomePage() {
    const { login, getAccessToken } = usePrivy();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const {authenticated, ready} = usePrivy();

    const handleLogin = async () => {
        try {
            await login(); 
            const accessToken = await getAccessToken({expiresIn: '1d'});
            if (ready && authenticated){
            navigate("/Hours");} 
        } catch (error) {
            setLoginError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div>
              <h1 style={{ color: 'red' }}>Welcome to the UC Volunteer Tracker</h1>
              <img src={uclogo} style={{ width: '150px', height: '150px' }} />
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
}

export default HomePage;
