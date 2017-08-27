import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap/es';
import renderIf from 'render-if';
import logo from 'images/logo.png';
import fb from 'images/fb.png';
import google from 'images/google.png';
import twitter from 'images/twitter.png';

const Navigation = ({ loggedIn, currentUser }) => {
  let dropdownTitle;
  if(loggedIn) {
    dropdownTitle = (
      <span>
        <img src={currentUser.avatar} alt={currentUser.name} className='avatar' />
        {currentUser.name}
      </span>
    );
  } else {
    dropdownTitle = 'Login';
  }

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href='/'>
            <img src={logo} alt='DebateVid.io' />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem href='/faq'>FAQ</NavItem>
          {renderIf(loggedIn)(
            <NavItem href='/videos/new'>Submit</NavItem>
          )}
          {renderIf(loggedIn)(() => (
            <NavDropdown id='nav-dropdown' title={dropdownTitle}>
              <MenuItem href={`/users/${currentUser.id}`}>Profile</MenuItem>
              <MenuItem href='/favorites'>Favorites</MenuItem>
              <MenuItem href='/logout'>Logout</MenuItem>
            </NavDropdown>
          ))}
          {renderIf(!loggedIn)(
            <NavDropdown id='nav-dropdown' title={dropdownTitle} className='auth-dropdown'>
              <MenuItem href='/auth/facebook'>
                <img src={fb} alt='Facebook' className='nav-dropdown-img' /> Facebook
              </MenuItem>
              <MenuItem href='/auth/twitter'>
                <img src={twitter} alt='Twitter' className='nav-dropdown-img' /> Twitter
              </MenuItem>
              <MenuItem href='/auth/google_oauth2'>
                <img src={google} alt='Google' className='nav-dropdown-img' /> Google
              </MenuItem>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
};

export default Navigation;
