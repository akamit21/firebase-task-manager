import React, { Component } from "react";
import { CardColumns, Container, Row } from "react-bootstrap";
import { db } from "../firebase";
import TaskCard from "./TaskCard";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    db.collection("tasks")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          this.setState({
            tasks: [...this.state.tasks, { id: doc.id, ...doc.data() }],
          });
        });
      });
  }

  completeTask = (docID) => {
    db.collection("tasks")
      .doc(docID)
      .update({
        status: true,
      })
      .then(() => {
        window.location.reload();
      });
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <CardColumns>
            {this.state.tasks &&
              this.state.tasks.map((task, index) => (
                <TaskCard
                  key={index}
                  taskInfo={task}
                  handleCompleteTask={this.completeTask}
                />
              ))}
          </CardColumns>
        </Row>
      </Container>
    );
  }
}

export default TaskList;
