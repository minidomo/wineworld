import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
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
    <nav class={`navbar bg-${DarkMode('')}`} data-bs-theme={DarkMode('')}>
      <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            WineWorld
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
              <li class="nav-item">{DarkMode('toggle')}</li>
            </ul>
          </div>
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control type="search" placeholder="search" onChange={event => setQuery(event.target.value)} />
          </Form>
        </div>
      </nav>
    </nav>
  );
};

export default NavBar;
