import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { useHistory } from "react-router-dom";
import { users as usersService } from "./server/users.js";

export default function Login(props) {
  const [loginForm, setLoginForm] = useState({
    user: "",
    pass: "",
  });
  const [errorResponse, setErrorResponse] = useState({
    msg: "",
    error: false,
  });
  const history = useHistory();

  useEffect(() => {
    document.body.style.backgroundColor = "#e9ecef";
  }, []);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm((inputsValue) => {
      return { ...inputsValue, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    usersService
      .login(loginForm.username, loginForm.password)
      .then((v) => {
        setErrorResponse({
          msg: "",
          error: false,
        });

        history.push("/");
      })
      .catch((v) => {
        setErrorResponse(v);
      });
  }

  return (
    <div className="login">
      <div className="login-logo">
        <i className="bi bi-list-task" />
        <b> Task List</b>
      </div>
      <Card>
        <Card.Header className="login-msg">
          Sign in to start your session
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="bi bi-person-circle"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                isInvalid={errorResponse.error}
              />
              <Form.Control.Feedback type="invalid">
                {errorResponse.msg}
              </Form.Control.Feedback>
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="bi bi-lock-fill"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Password"
                isInvalid={errorResponse.error}
              />
            </InputGroup>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
