import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function Welcome() {
  const location = useLocation();

  return (
    <Container fluid className="mainBody">
      <Card>
        <Card.Header as="h5">Welcome !</Card.Header>
        <Card.Body>
          <p>{location.state}</p>
          <p>
            Welcome to the Task List Application. This is to demonstrate how to
            create a <b>Progressive Web App</b> with React.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
