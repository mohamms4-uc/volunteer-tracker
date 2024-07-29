import React, { useState } from "react";
import "./HourSubmission.css";

const HourSubmission = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);

  const showAddHoursPopup = () => setPopupVisible(true);
  const hideAddHoursPopup = () => setPopupVisible(false);

  const handleSubmit = () => {
    console.log("Hours:", document.getElementById("hoursVolunteered").value);
    console.log("Description:", document.getElementById("description").value);
    console.log("Impact:", document.getElementById("impact").value);
    hideAddHoursPopup();
  };

  return (
    <div className="hour-submission">
      <header>
        <div className="header">
          <img
            src="https://s3.amazonaws.com/files.galaxydigital.com/4722/images/banner-small.jpg?updated=1716478649"
            alt="Community Engagement"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </header>
      <div className="notification-bar">
        <div className="notification-left">
          <span id="notificationCount" className="notification-icon">
            {notificationCount > 0 ? notificationCount : ""}
          </span>
          <span>Notifications</span>
        </div>
        <div id="userMenu" className="user-menu"></div>
      </div>

      <div className="content-wrapper">
        <div className="sidebar">
          <div className="sidebar-item active">
            <span className="icon">🏠</span>
            MY ORGANIZATION
          </div>
          <div className="sidebar-item">
            <span className="icon">✔️</span>
            HOUR SUBMISSIONS
          </div>
          <div className="sidebar-item">
            <span className="icon">✔️</span>
            MY EVENTS
          </div>
          <div className="sidebar-item">
            <span className="icon">🔍</span>
            SEARCH
          </div>
        </div>
        <div className="main-content">
          <main>
            <section id="my-hours">
              <h2>My Hours</h2>
              <button onClick={showAddHoursPopup}>Add Hours +</button>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Hours</th>
                    <th>User Group</th>
                    <th>Type</th>
                    <th>Miles Traveled</th>
                    <th>Tokenized</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nov 3, 2023</td>
                    <td>1819 Innovation Hub Individual</td>
                    <td>—</td>
                    <td>—</td>
                    <td>0</td>
                    <td>Yes</td>
                    <td className="status-unfinished">Unfinished</td>
                  </tr>
                  <tr>
                    <td>Nov 3, 2023</td>
                    <td>1819 Innovation Hub Individual</td>
                    <td>—</td>
                    <td>—</td>
                    <td>0</td>
                    <td>Yes</td>
                    <td className="status-unfinished">Unfinished</td>
                  </tr>
                  <tr>
                    <td>Nov 3, 2023</td>
                    <td>1819 Innovation Hub Individual</td>
                    <td>2.00</td>
                    <td>—</td>
                    <td>0</td>
                    <td>No</td>
                    <td className="status-pending">Pending</td>
                  </tr>
                  <tr>
                    <td>Nov 3, 2023</td>
                    <td>1819 Innovation Hub Individual</td>
                    <td>22.00</td>
                    <td>—</td>
                    <td>0</td>
                    <td>No</td>
                    <td className="status-pending">Pending</td>
                  </tr>
                  <tr>
                    <td>Nov 3, 2023</td>
                    <td>1819 Innovation Hub Individual</td>
                    <td>15.00</td>
                    <td>—</td>
                    <td>0</td>
                    <td>Yes</td>
                    <td className="status-accepted">Accepted</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </div>
      {popupVisible && (
        <div id="addHoursPopup" className="popup-overlay">
          <div className="popup">
            <h2>1819 Innovation Hub Individual</h2>
            <p>Date Volunteered: <span id="dateVolunteered">{new Date().toLocaleDateString()}</span></p>
            
            <label htmlFor="hoursVolunteered">Hours Volunteered:</label>
            <input type="number" id="hoursVolunteered" step="0.5" defaultValue="3.5" />
            
            <label htmlFor="description">Description (50 - 100 words)</label>
            <textarea id="description" rows="4" placeholder="Write here"></textarea>
            
            <label htmlFor="impact">How were you impacted by this volunteer experience?</label>
            <textarea id="impact" rows="4" placeholder="Write here"></textarea>
            
            <div className="popup-buttons">
              <button id="submitButton" onClick={handleSubmit}>Submit</button>
              <button id="cancelButton" onClick={hideAddHoursPopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HourSubmission;
