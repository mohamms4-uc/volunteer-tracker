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
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation popup

  const handleAddEntry = () => {
    if (hours) {
      setShowConfirmation(true);
    }
  };

  const confirmAddEntry = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const dateTime = `${currentDate} ${currentTime}`;
    
    setEntries([...entries, { hours, date: dateTime }]);
    setHours('');
    setShowConfirmation(false);
  };

  const cancelAddEntry = () => {
    setShowConfirmation(false);
  };

  const handleDeleteEntry = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Stop event propagation to prevent triggering the parent row click event
    event.stopPropagation();

    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '27px',
  };

  const inputStyle = {
    borderRadius: '8px',
    border: '3px solid #ddd',
    backgroundColor: '#f0f0f0', 
    padding: '10px',
    marginRight: '10px',
    fontSize: '1em',
    width: '150px',
    height: '50px',
    boxSizing: 'border-box',
    color: 'black',
    textAlign: 'center', 
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

  const deleteButtonStyle = {
    backgroundColor: 'white',
    color: 'red',
    width: '30px',
    height: '30px',
    lineHeight: '30px',
    fontSize: '1.2em',
    textAlign: 'center',
    borderRadius: '4px',
    border: 'solid',
    cursor: 'pointer',
  };

  const alertStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    backgroundColor: 'red',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    zIndex: 999,
    display: showConfirmation ? 'block' : 'none',
    border: '3px solid black',
  };

  const yesButtonStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px 20px',
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: '3px solid black', // Thick black outline
    marginRight: '10px',
  };

  const noButtonStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px 20px',
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: '3px solid black', // Thick black outline
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
            <th style={thStyle}></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index} onClick={() => setShowConfirmation(true)}>
              <td style={cellStyle}>{entry.hours}</td>
              <td style={cellStyle}>{entry.date}</td>
              <td style={{ ...cellStyle, textAlign: 'center' }}>
                <button
                  style={deleteButtonStyle}
                  onClick={(event) => handleDeleteEntry(index, event)}
                >
                  X
                </button>
              </td>
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
      
      {/* Alert Popup */}
      <div style={alertStyle}>
        <p>Are you sure you want to start a volunteering session?</p>
        <button style={yesButtonStyle} onClick={confirmAddEntry}>Yes</button>
        <button style={noButtonStyle} onClick={cancelAddEntry}>No</button>
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
