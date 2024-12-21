import React from 'react';
import { Navbar, Button } from 'reactstrap';
import logo from '../Images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar style={{ backgroundColor: '#C9CA6F', padding: '10px', display: 'flex', alignItems: 'center' }}>
      <div className="navbar-logo">
        <Link >
          <img src={logo} className="logo" alt="Logo" style={{ height: '60px', width: 'auto' }} />
        </Link>
      </div>
      <div className="navbar-buttons" style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
        <Link to="/UserLogin">
          <Button style={{ backgroundColor: '#4A5A3A', color: 'white', border: 'none' }}>Login</Button>
        </Link>
        <Link to="/OwnerLogin">
          <Button style={{ backgroundColor: '#4A5A3A', color: 'white', border: 'none' }}>Owner</Button>
        </Link>
        
      </div>
    </Navbar>
  );
};

export default Header;
