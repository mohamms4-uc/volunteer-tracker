import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrivy } from '@privy-io/react-auth';
import uclogo from './uclogo.png';

function HomePage() {
    const { login } = usePrivy();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const {authenticated, ready} = usePrivy();

    const handleLogin = async () => {
        try {
            await login(); // Assuming login does not return a response
            if (ready && authenticated){
            navigate("/Hours");} // Navigate to the desired path after successful login
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
