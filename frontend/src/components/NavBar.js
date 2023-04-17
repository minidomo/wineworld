import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

import DarkMode from './DarkMode';

const NavBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <Navbar variant='navbar fixed-top' expand='lg'>
      {/* <Navbar className="custom fixed-top navbar-expand-lg"> */}
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          WineWorld
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link" to="/about">
                About
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/wines">
                Wines
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/vineyards">
                Vineyards
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/regions">
                Regions
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/visualizations">
                Visualizations
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/provider">
                Provider Visualizations
              </Link>
            </li>
            <li class="nav-item">
              {DarkMode('toggle')}
            </li>
          </Nav>
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control className="custom" type="search" placeholder="search"
              onChange={event => setQuery(event.target.value)} />
          </Form>
        </Navbar.Collapse>
      </div>
      {/* </Navbar> */}
    </Navbar>
  );
};

export default NavBar;
