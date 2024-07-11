import React from 'react';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import 'bootstrap/dist/css/bootstrap.min.css';

const sidebarStyle: React.CSSProperties = {
  backgroundColor: 'gray',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '250px'
};

const linkStyle: React.CSSProperties = {
  backgroundColor: 'blue',
  color: 'white',
  borderRadius: '5px',
  margin: '10px 0',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
};

const linkHoverStyle: React.CSSProperties = {
  backgroundColor: 'darkblue'
};

const Sidebar: React.FC = () => {
  return (
    <SidebarMenu style={sidebarStyle}>
      <SidebarMenu.Header>
        <SidebarMenu.Brand>
          {/* Your brand icon */}
        </SidebarMenu.Brand>
        <SidebarMenu.Toggle />
      </SidebarMenu.Header>
      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link style={linkStyle} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'darkblue'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'blue'; }}>
            <SidebarMenu.Nav.Icon>
              {/* Dashboard icon */}
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              Dashboard
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link style={linkStyle} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'darkblue'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'blue'; }}>
            <SidebarMenu.Nav.Icon>
              {/* My Hours icon */}
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              My Hours
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link style={linkStyle} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'darkblue'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'blue'; }}>
            <SidebarMenu.Nav.Icon>
              {/* Opportunities icon */}
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              Opportunities
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
};

export default Sidebar;
