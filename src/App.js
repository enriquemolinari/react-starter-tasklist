import React from "react";
import "./App.css";
import TasksList from "./TasksList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Menu from "./Menu";
import Login from "./Login";
import Welcome from "./Welcome";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route exact path={"/"}>
        <Menu />
        <Welcome />
      </Route>
      <Route exact path={"/tasklist"}>
        <Menu />
        <TasksList />
      </Route>
      <Route exact path={"/login"}>
        <Login />
      </Route>
    </>
  );
}

export default App;
