import React from 'react';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import 'bootstrap/dist/css/bootstrap.min.css';

const sidebarStyle: React.CSSProperties = {
  backgroundColor: 'white',
  position: 'fixed',
  top: '18vh',
  left: 0,
  height: '100%',
  width: '200px',
  border: '2px solid #808080',
};

const linkStyle: React.CSSProperties = {
  backgroundColor: 'red',
  color: 'white',
  border: '2px solid red',
  borderRadius: '5px',
  margin: '10px 0',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
};

const Sidebar: React.FC = () => {
  const handleMouseOver = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.currentTarget.style.backgroundColor = 'red';
    e.currentTarget.style.color = 'white';
    e.currentTarget.style.border = '2px solid black';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.currentTarget.style.backgroundColor = 'red';
    e.currentTarget.style.color = 'white';
    e.currentTarget.style.border = '2px solid red';
  };

  return (
    <SidebarMenu style={sidebarStyle}>
      <SidebarMenu.Header>
        <SidebarMenu.Brand>
          {/* Your brand icon */}
        </SidebarMenu.Brand>
      </SidebarMenu.Header>
      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link 
            style={linkStyle} 
            onMouseOver={handleMouseOver} 
            onMouseOut={handleMouseOut}
          >
            <SidebarMenu.Nav.Icon>
              {/* Dashboard icon */}
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              Dashboard
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link 
            style={linkStyle} 
            onMouseOver={handleMouseOver} 
            onMouseOut={handleMouseOut}
          >
            <SidebarMenu.Nav.Icon>
              {/* My Hours icon */}
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              Past Volunteer Hours
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link 
            style={linkStyle} 
            onMouseOver={handleMouseOver} 
            onMouseOut={handleMouseOut}
          >
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
