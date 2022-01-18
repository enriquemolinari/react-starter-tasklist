import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useHistory } from "react-router-dom";
import User from "./User";
import PrivateRoute from "./PrivateRoute";

export default function Menu(props) {
  const userName = User.current().userName();
  const history = useHistory();

  function handleLogout(e) {
    e.preventDefault();
    User.current(props.apiGwUrl)
      .logout()
      .then(() => history.push("/login"));
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
            <PrivateRoute
              component={<Link to="/tasklist">Task List</Link>}
              requiredRoles={["SIMPLE", "ADMIN"]}
            ></PrivateRoute>
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
