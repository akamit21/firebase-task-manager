import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Menubar from "./components/Menubar";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <AuthProvider>
      <Menubar />
      <Switch>
        <PrivateRoute path="/" exact={true} component={TaskList} />
        <PrivateRoute path="/add/" component={AddTask} />
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={SignUp} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
