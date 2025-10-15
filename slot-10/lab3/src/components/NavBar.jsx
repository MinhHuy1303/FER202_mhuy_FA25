import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Container } from 'react-bootstrap';
import { Search, Person, Heart, BoxArrowInRight } from 'react-bootstrap-icons';
import './NavBar.css';

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Có thể thêm logic search ở đây
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        {/* Brand/Logo */}
        <Navbar.Brand href="#home" className="fw-bold">
          MovieHub
        </Navbar.Brand>

        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="#about" className="nav-link-custom">About</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">Contact</Nav.Link>
          </Nav>

          {/* Search Form and Icons */}
          <div className="d-flex align-items-center navbar-right">
            {/* Quick Search Form */}
            <Form className="d-flex me-3" onSubmit={handleSearch}>
              <div className="position-relative">
                <FormControl
                  type="search"
                  placeholder="Quick search..."
                  className="search-input-with-icon"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon-inside">
                  <Search size={16} />
                </span>
              </div>
            </Form>

            {/* Favourites Icon */}
            <Button variant="link" className="icon-btn me-2" title="Favourites">
              <Heart className="icon" />
            </Button>

            {/* Login Icon */}
            <Button variant="link" className="icon-btn me-3" title="Login">
              <BoxArrowInRight className="icon" />
            </Button>

            {/* Accounts Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="link" className="icon-btn accounts-dropdown" id="dropdown-basic">
                <Person className="icon" />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end" className="accounts-menu">
                <Dropdown.Item href="#manage-profiles">
                  Manage Your Profiles
                </Dropdown.Item>
                <Dropdown.Item href="#account">
                  Build your Account
                </Dropdown.Item>
                <Dropdown.Item href="#change-password">
                  Change Password
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}