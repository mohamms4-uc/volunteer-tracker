import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import axios from 'axios';

function Hours() {
  const { user } = usePrivy(); // Ensure Privy integration is working
  const [entries, setEntries] = useState([]);
  const [hours, setHours] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedEntries = localStorage.getItem('volunteerEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }

// hook up 'create attestation' to the 'enter hours' button
// fix pushing emails to google sheets
// Pulling NFC.ID, EVENT.ID, ORGANIZER.ID to make dynamic based on NFC chip scanned

    // Send email to the backend after component mounts
    if (user && user.email) {
      const userEmail = user.email.address;
      axios.post('http://localhost:5000/api/login', { email: userEmail })
        .then(response => {
          console.log("Email sent to the backend:", response.data);
        })
        .catch(error => {
          console.error("Error sending email to the backend:", error);
        });
    }
  }, [user]);

  const handleAddEntry = () => {
    if (hours) {
      setShowConfirmation(true);
    }
  };

  const confirmAddEntry = () => {
    const currentDate = new Date().toLocaleString();

    const newEntry = { hours_volunteered: hours, volunteered_at: currentDate };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    setHours('');
    setShowConfirmation(false);

    localStorage.setItem('volunteerEntries', JSON.stringify(updatedEntries));
  };

  const cancelAddEntry = () => {
    setShowConfirmation(false);
  };

  const handleDeleteEntry = (index, event) => {
    event.stopPropagation();

    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);

    localStorage.setItem('volunteerEntries', JSON.stringify(updatedEntries));
  };

  return (
    <div>
      <h1 style={{ color: 'red' }}>Volunteer Dashboard</h1>
      <h2>Past Volunteer Hours</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ width: '100px', backgroundColor: 'red', color: 'white', textAlign: 'center' }}>Hours</th>
            <th style={{ width: '100px', backgroundColor: 'red', color: 'white', textAlign: 'center' }}>Date & Time</th>
            <th style={{ width: '100px', backgroundColor: 'red', color: 'white', textAlign: 'center' }}></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{entry.hours_volunteered}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{entry.volunteered_at}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                <button
                  style={{ backgroundColor: 'white', color: 'red', width: '30px', height: '30px', lineHeight: '30px', fontSize: '1.2em', textAlign: 'center', borderRadius: '4px', border: 'solid', cursor: 'pointer' }}
                  onClick={(e) => handleDeleteEntry(index, e)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '27px' }}>
        <input
          style={{ borderRadius: '8px', border: '3px solid #ddd', backgroundColor: '#f0f0f0', padding: '10px', marginRight: '10px', fontSize: '1em', width: '150px', height: '50px', boxSizing: 'border-box', color: 'black', textAlign: 'center' }}
          type="text"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Add Hours"
        />
        <button
          style={{ borderRadius: '8px', border: 'none', backgroundColor: 'red', color: 'white', padding: '10px 20px', fontSize: '1em', fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', transition: 'background-color 0.3s' }}
          onClick={handleAddEntry}
        >
          Enter
        </button>
      </div>
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', backgroundColor: 'red', color: 'white', padding: '20px', textAlign: 'center', zIndex: 999, display: showConfirmation ? 'block' : 'none', border: '3px solid black' }}>
        <p>Are you sure you want to add this entry?</p>
        <button
          style={{ backgroundColor: 'white', color: 'black', padding: '10px 20px', fontSize: '1em', fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', transition: 'background-color 0.3s', border: '3px solid black', marginRight: '10px' }}
          onClick={confirmAddEntry}
        >
          Yes
        </button>
        <button
          style={{ backgroundColor: 'white', color: 'black', padding: '10px 20px', fontSize: '1em', fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', transition: 'background-color 0.3s', border: '3px solid black' }}
          onClick={cancelAddEntry}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default Hours;
