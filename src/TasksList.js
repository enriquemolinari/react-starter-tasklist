import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddTask from "./AddTask";
import User from "./User";

export default function TasksList(props) {
  const [tasks, setTasks] = useState({ tasks: [] });
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(0);
  const history = useHistory();

  let status = {
    DANGER: "danger",
    WARNING: "warning",
    FINE: "primary",
    FUTURE: "secondary",
  };

  useEffect(() => {
    retrieveTasks();
  }, []);

  function retrieveTasks() {
    fetch(props.apiGwUrl + "/tasks", {
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          User.current(props.apiGwUrl)
            .logout()
            .then(() => history.push("/login"));
          return { tasks: [] };
        } else {
          if (response.status !== 200) {
            setShowAlert(true);
            return { tasks: [] };
          }
        }
        return response.json();
      })
      .then((json) => {
        setTasks(json);
      });
  }

  function handleAddTask() {
    setShowAddTask(true);
  }

  function handleErrorAddTasks() {
    setShowAlert(true);
  }

  function handleConfirmAddTask() {
    retrieveTasks();
  }

  function handleCloseAddTask() {
    setShowAddTask(false);
  }

  function handleDeleteOpenConfirm(idTask) {
    setShow(true);
    setTaskToDelete(idTask);
  }

  function handleDeleteCloseConfirm() {
    setShow(false);
    setTaskToDelete(0);
  }

  function handleDelete() {
    setShow(false);
    fetch(props.apiGwUrl + "/tasks", {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({
        idTask: taskToDelete,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((r) => {
        if (!r.ok) throw Error(r.status);
        return r.json();
      })
      .then(() => retrieveTasks())
      .catch((e) => setShowAlert(true));
  }

  function handleDoneOrUnDone(e, done, idTask) {
    let uri = props.apiGwUrl + "/tasks/done";
    if (done) uri = props.apiGwUrl + "/tasks/inprogress";

    fetch(uri, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        idTask: idTask,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((r) => {
        if (!r.ok) throw Error(r.status);
        return r.json();
      })
      .then(() => retrieveTasks())
      .catch((e) => setShowAlert(true));
  }

  return (
    <Container fluid className="mainBody">
      <Alert
        show={showAlert}
        variant="danger"
        onClose={() => setShowAlert(false)}
        dismissible="true"
      >
        <Alert.Heading>Ops...</Alert.Heading>
        <p>Shomething when wrong...</p>
      </Alert>

      <Card>
        <Card.Header as="h5">
          <i className="bi bi-list-task" /> Task List
        </Card.Header>
        <Card.Body>
          {tasks.tasks.map((t, index) => (
            <ListGroup key={index} variant="flush">
              <ListGroup.Item className="border-top">
                <Form.Check
                  type="checkbox"
                  onChange={(e) => handleDoneOrUnDone(e, t.done, t.id)}
                  checked={t.done}
                  inline={true}
                />
                {t.done ? <span className="done">{t.text}</span> : t.text}
                {!t.done && (
                  <Badge variant={status[t.status]}>
                    <i className="bi bi-clock"></i> {t.expirationDate}
                  </Badge>
                )}
                <a
                  title="delete task"
                  role="button"
                  onClick={(e) => handleDeleteOpenConfirm(t.id)}
                >
                  <i className="float-right bi bi-trash"></i>
                </a>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button variant="primary float-right" onClick={handleAddTask}>
            <i className="bi bi-plus-lg" />
            Add Task
          </Button>
        </Card.Footer>
      </Card>

      <AddTask
        apiGwUrl={props.apiGwUrl}
        show={showAddTask}
        handleAddTask={handleConfirmAddTask}
        handleCloseAddTask={handleCloseAddTask}
        handleErrorAddTasks={handleErrorAddTasks}
      />

      <Modal show={show} onHide={handleDeleteCloseConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are sure you want to delete the task ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteCloseConfirm}>
            No
          </Button>
          <Button variant="secondary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
