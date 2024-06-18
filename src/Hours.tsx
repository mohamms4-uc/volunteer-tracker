import { usePrivy } from '@privy-io/react-auth';
import React, { useState } from 'react';

interface Entry {
  hours: string;
  date: string;
}

function Hours() {
  const { user } = usePrivy();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [hours, setHours] = useState('');

  const handleAddEntry = () => {
    if (hours) {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const dateTime = `${currentDate} ${currentTime}`;
      
      setEntries([...entries, { hours, date: dateTime }]);
      setHours('');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '27px',
  };

  const inputStyle = {
    borderRadius: '8px',
    border: '3px solid #ddd',
    backgroundColor: '#f0f0f0', // Light shaded grey
    padding: '10px',
    marginRight: '10px',
    fontSize: '1em',
    width: '150px',
    height: '50px',
    boxSizing: 'border-box',
    color: 'black',
    textAlign: 'center', // Center text horizontally

  };

  const buttonStyle = {
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const thStyle = {
    ...cellStyle,
    width: '50px',
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <div>
      <h1>Volunteer Dashboard</h1>
      <h2>Past Volunteer Hours</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Hours</th>
            <th style={thStyle}>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td style={cellStyle}>{entry.hours}</td>
              <td style={cellStyle}>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={containerStyle}>
        <input
          type="number"
          placeholder="Input Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          style={inputStyle}
        />
        <button style={buttonStyle} onClick={handleAddEntry}>Enter</button>
      </div>
    </div>
  );
}

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
  color: 'black',
};

export default Hours;
