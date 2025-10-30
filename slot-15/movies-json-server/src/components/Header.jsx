import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">🎬 Movie App</Navbar.Brand>
        <Nav className="ms-auto">
          {user ? (
            <>
              <Navbar.Text className="me-3 text-light">Xin chào, {user.fullname}</Navbar.Text>
              <Button variant="outline-light" onClick={() => { logout(); navigate("/"); }}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <Button variant="outline-light" onClick={() => navigate("/")}>Đăng nhập</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
