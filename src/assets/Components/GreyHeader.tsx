import React from 'react';

const greyHeaderStyle: React.CSSProperties = {
  width: '100%',
  height: '13vh',
  backgroundColor: '#808080', // Grey color
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: '13vh', // Positioned immediately below the red header
  left: '0',
  zIndex: 999,
};

const GreyHeader: React.FC = () => {
  return (
    <div style={greyHeaderStyle}>
      <h1 style={{ fontSize: '0.5rem' }}>Grey Header</h1> {/* Adjust fontSize here */}
    </div>
  );
};

export default GreyHeader;
