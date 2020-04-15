import React from "react";
import { TodoPage } from "./Components/Pages/TodoPage";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/active">
          <TodoPage filter="active" />
        </Route>
        <Route path="/completed">
          <TodoPage filter="completed" />
        </Route>
        <Route path="/all">
          <TodoPage filter="all" />
        </Route>
        <Route path="/">
          <Redirect to="/all" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
