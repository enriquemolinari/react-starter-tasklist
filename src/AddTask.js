import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function AddTask(props) {
  const [inputsValue, setInputsValue] = useState({
    expirationDate: "",
    taskText: "",
  });
  const [formErrors, setFormErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    fetch(props.apiGwUrl + "/tasks", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        expirationDate: inputsValue.expirationDate,
        taskText: inputsValue.taskText,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((r) => {
        if (!r.ok) throw Error(r.status);
        return r.json();
      })
      .then((json) => {
        if (json.result === "error") {
          setFormErrors(json.message);
        } else {
          setInputsValue({
            expirationDate: "",
            taskText: "",
          });
          setFormErrors({});
          props.handleCloseAddTask();
          props.handleAddTask();
        }
      })
      .catch((e) => {
        props.handleErrorAddTasks();
      });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputsValue((inputsValue) => {
      return { ...inputsValue, [name]: value };
    });
  }

  return (
    <Modal dismissable show={props.show}>
      <Modal.Header>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            type="text"
            name="expirationDate"
            onChange={handleChange}
            value={inputsValue.expirationDate}
            placeholder="YYYY-MM-DD HH:mm"
            isInvalid={formErrors.expirationDate}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.expirationDate}
          </Form.Control.Feedback>
          <br />
          <Form.Control
            type="text"
            name="taskText"
            onChange={handleChange}
            value={inputsValue.taskText}
            placeholder="Describe de Task..."
            isInvalid={formErrors.taskText}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.taskText}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.handleCloseAddTask()}>
          Cancel
        </Button>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
