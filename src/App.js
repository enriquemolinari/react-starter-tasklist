import React from "react";
import "./App.css";
import TasksList from "./TasksList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Menu from "./Menu";
import Login from "./Login";
import Welcome from "./Welcome";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function App() {
  const apiAuth = process.env.REACT_APP_URI_AUTH;
  const apiTask = process.env.REACT_APP_URI_TASK;

  return (
    <>
      <Route exact path={"/"}>
        <Menu apiGwUrl={apiAuth} />
        <Welcome />
      </Route>
      <Route exact path={"/tasklist"}>
        <Menu apiGwUrl={apiAuth} />
        <PrivateRoute
          component={<TasksList apiGwUrl={apiTask} />}
          requiredRoles={["SIMPLE", "ADMIN"]}
        />
      </Route>
      <Route exact path={"/login"}>
        <Login apiGwUrl={apiAuth} />
      </Route>
    </>
  );
}

export default App;
