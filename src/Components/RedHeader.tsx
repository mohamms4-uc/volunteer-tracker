import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import CommunityEngagementImage from './CommunityEngagement.png';

const redHeaderStyle: React.CSSProperties = {
  width: '100%',
  height: '13vh',
  backgroundColor: '#e00122',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: 1000,
};

const greyHeaderStyle: React.CSSProperties = {
  width: '100%',
  height: '5vh',
  backgroundColor: '#3A3A3E',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // Adjusted for button placement
  padding: '0 20px', // Adjusted for button placement
  position: 'fixed',
  top: '13vh', // Positioned immediately below the red header
  left: '0',
  zIndex: 999,
};

const imageStyle: React.CSSProperties = {
  height: '10vh',
};

const RedHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      <div style={redHeaderStyle}>
        <img src={CommunityEngagementImage} alt="Community Engagement" style={imageStyle} />
      </div>
      <div style={greyHeaderStyle}>
        <div style={{ flex: 0 }} /> 
        <h2 style={{ marginLeft: '80px' }}>Student Portal</h2> 
        <button
          style={{
            fontSize: '1rem',
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: '#8080',
            color: 'white',
            border: '2px solid white',
            cursor: 'pointer',
          }}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      <Sidebar />
    </>
  );
};

export default RedHeader;
