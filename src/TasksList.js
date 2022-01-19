import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { tasks as tasksService } from "./server/tasks.js";

export default function TasksList(props) {
  const [tasks, setTasks] = useState({ tasks: [] });
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(0);

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
    tasksService
      .retrieveAll()
      .then((json) => setTasks(json))
      .catch((error) => {
        setError(error);
        return { tasks: [] };
      });
  }

  function handleAddTask() {
    setShowAddTask(true);
  }

  function handleErrorAddTasks() {
    setError("Something when wrong adding the task.");
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
    tasksService
      .delete(taskToDelete)
      .then(() => retrieveTasks())
      .catch((e) => setError(e));
  }

  function handleDoneOrUnDone(e, done, idTask) {
    tasksService
      .doneOrUndone(done, idTask)
      .then(() => retrieveTasks())
      .catch((e) => setError(e));
  }

  return (
    <Container fluid className="mainBody">
      <Alert
        show={error}
        variant="danger"
        onClose={() => setError(null)}
        dismissible="true"
      >
        <Alert.Heading>Ops...</Alert.Heading>
        <p>{error}</p>
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
