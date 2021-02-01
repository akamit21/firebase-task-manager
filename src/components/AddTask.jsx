import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { db } from "../firebase";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      priority: "",
      deadline: "",
      status: false,
      notes: "",
      createOn: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addTask = (e) => {
    e.preventDefault();
    db.collection("tasks")
      .add({
        name: this.state.name,
        priority: this.state.priority,
        deadline: this.state.deadline * 60,
        status: this.state.status,
        notes: this.state.notes,
        createdOn: Date.now(),
        spentTime: 0,
      })
      .then(() => {
        this.setState({
          name: "",
          priority: "",
          deadline: "",
          status: false,
          notes: "",
          createdAt: null,
        });
      });
  };

  render() {
    return (
      <Container className="mt-5">
        <Form onSubmit={(event) => this.addTask(event)}>
          <Form.Group controlId="">
            <Form.Label className="font-weight-bold">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              size="lg"
              placeholder="Task Name"
              value={this.state.name}
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label className="font-weight-bold">
              Select Priority
            </Form.Label>
            <Form.Control
              as="select"
              name="priority"
              size="lg"
              onChange={(e) => this.handleChange(e)}
            >
              <option defaultValue="">Choose ... </option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label className="font-weight-bold">Deadline</Form.Label>
            <Form.Control
              type="number"
              name="deadline"
              size="lg"
              placeholder="Deadline (In Minutes < 30)"
              value={this.state.deadline}
              onChange={(e) => this.handleChange(e)}
              min="1"
              max="30"
            />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label className="font-weight-bold">Extra Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              size="lg"
              rows="3"
              value={this.state.notes}
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </Form>
      </Container>
    );
  }
}

export default AddTask;
