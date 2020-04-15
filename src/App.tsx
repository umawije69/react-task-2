import React from "react";
import { TodoPage } from "./Components/Pages/TodoPage";
import { ErrorPage } from "./Components/Pages/ErrorPage";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
