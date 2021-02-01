import React, { Component } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { db } from "../firebase";

class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: this.props.taskInfo.spentTime,
      minutes: "",
      seconds: "",
      running: false,
    };
  }

  handleTimer = (e) => {
    e.preventDefault();
    if (!this.state.running) {
      this.setState({ running: true });
      let time = this.state.timer;
      this.interval = setInterval(() => {
        let min = Math.floor(time / 60);
        let sec = time - min * 60;
        if (time < this.props.taskInfo.deadline) {
          this.setState({
            running: true,
            timer: time,
            seconds: sec < 10 ? "0" + sec : sec,
            minutes: min < 10 ? "0" + min : min,
          });
          time = this.state.timer + 1;
        } else {
          this.setState({ running: false });
          db.collection("tasks")
            .doc(this.props.taskInfo.id)
            .update({
              status: true,
            })
            .then(() => {
              this.setState({ running: false });
              clearInterval(this.interval);
            });
        }
      }, 1000);
    } else {
      db.collection("tasks")
        .doc(this.props.taskInfo.id)
        .update({
          spentTime: this.state.timer,
        })
        .then(() => {
          this.setState({ running: false });
          clearInterval(this.interval);
        });
    }
  };

  render() {
    const { taskInfo } = this.props;
    return (
      <Card>
        <Card.Img
          variant="top"
          src="https://placeimg.com/640/480/tech"
          alt="..."
        />
        <Card.Body>
          <Card.Title>
            {taskInfo.name}
            <span className="badge badge-dark float-right">
              {taskInfo.priority}
            </span>
          </Card.Title>
          <Card.Text>Deadline: {taskInfo.deadline / 60} minutes</Card.Text>
          <Card.Text>
            Spent Time: {this.state.minutes === "" ? "00" : this.state.minutes}
            &nbsp;:&nbsp;
            {this.state.seconds === "" ? "00" : this.state.seconds}
          </Card.Text>
          <Card.Text>{taskInfo.notes}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {taskInfo.status ? (
            <small className="text-muted">{taskInfo.createdOn}</small>
          ) : (
            <ButtonGroup aria-label="task-button">
              <Button
                variant="primary"
                type="button"
                onClick={(e) => this.handleTimer(e)}
              >
                {!this.state.running ? "Start" : "Stop"}
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={() => this.props.handleCompleteTask(taskInfo.id)}
              >
                Complete Task
              </Button>
            </ButtonGroup>
          )}
        </Card.Footer>
      </Card>
    );
  }
}

export default TaskCard;
