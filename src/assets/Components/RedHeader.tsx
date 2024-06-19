import React from 'react';

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
  height: '4vh',
  backgroundColor: '#3A3A3E', // Grey color
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: '13vh', // Positioned immediately below the red header
  left: '0',
  zIndex: 999,
};

const imageStyle: React.CSSProperties = {
  height: '10vh', // Adjust as necessary
};

const RedHeader: React.FC = () => {
  return (
    <>
      <div style={redHeaderStyle}>
        <img src="/CommunityEngagement.png" alt="Community Engagement" style={imageStyle} />
      </div>
      <div style={greyHeaderStyle}>
        <h1>Temp</h1>
      </div>
    </>
  );
};

export default RedHeader;
