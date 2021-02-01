import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Menubar = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const userLogout = async () => {
    await logout();
    history.push("/login");
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#home">Firebase : Task Manager App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {currentUser ? (
            <>
              <Nav.Item as="li">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/add" className="nav-link">
                  Add
                </Link>
              </Nav.Item>
              <NavDropdown
                title={currentUser && currentUser.email}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Item as="li">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/signup" className="nav-link">
                  SignUp
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Menubar;
