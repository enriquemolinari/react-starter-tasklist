import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useHistory } from "react-router-dom";
import { users as usersService } from "./server/users.js";

export default function Menu(props) {
  const userName = usersService.userName();
  const history = useHistory();

  function handleLogout(e) {
    e.preventDefault();
    usersService.logout().then(() => history.push("/login"));
  }

  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand href="#">
        <Link to="/">PWA with React</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">
            <Link to="/tasklist">Task List</Link>
          </Nav.Link>
        </Nav>
        <Nav>
          {!userName && <Link to="/login">Sign in</Link>}
          {userName && (
            <a href="#task" onClick={handleLogout}>
              <i className="bi bi-person-circle"> {userName}</i> (Log out)
            </a>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
