import React from "react";
import "./App.css";
import TasksList from "./TasksList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Menu from "./Menu";
import Login from "./Login";
import Welcome from "./Welcome";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <>
            <Menu />
            <Welcome />
          </>
        }
      />
      <Route
        path={"/tasklist"}
        element={
          <>
            <Menu />
            <TasksList />
          </>
        }
      />
      <Route exact path={"/login"} element={<Login />} />
    </Routes>
  );
}

export default App;
