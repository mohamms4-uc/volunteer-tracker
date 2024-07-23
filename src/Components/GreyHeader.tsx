import React from 'react';
import { useNavigate } from 'react-router-dom';

const greyHeaderStyle: React.CSSProperties = {
  width: '100%',
  height: '13vh',
  backgroundColor: '#808080',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  position: 'fixed',
  top: '13vh',
  left: '0',
  zIndex: 999,
};

const GreyHeader: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    navigate('/login'); 
  };

  return (
    <div style={greyHeaderStyle}>
      <h1 style={{ fontSize: '1rem', margin: 0 }}>Grey Header</h1>
      <button
        style={{
          fontSize: '0.8rem',
          padding: '8px 12px',
          borderRadius: '5px',
          backgroundColor: 'white',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default GreyHeader;
