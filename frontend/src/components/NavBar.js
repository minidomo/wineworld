import React from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

import DarkMode from './DarkMode';

const NavBar = () => {
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const input = event.target.querySelector('input');
    navigate(`/search/${input.value}`);
  };

  return (
    <Navbar variant={`navbar bg-${DarkMode()}`} expand="lg" data-bs-theme={DarkMode()}>
      <Navbar variant="custom fixed-top bg-body-tertiary" expand="lg">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            WineWorld
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
              <Nav.Item>
                <Link class="nav-link" to="/about">
                  About
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link class="nav-link" to="/wines">
                  Wines
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link class="nav-link" to="/vineyards">
                  Vineyards
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link class="nav-link" to="/regions">
                  Regions
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link class="nav-link" to="/visualizations">
                  Visualizations
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link class="nav-link" to="/provider">
                  Provider Visualizations
                </Link>
              </Nav.Item>
              <Nav.Item>{DarkMode('toggle')}</Nav.Item>
            </Nav>
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control className="custom" type="search" placeholder="Search" />
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </Navbar>
  );
};

export default NavBar;
