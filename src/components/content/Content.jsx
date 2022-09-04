import React from "react";
import Header from "../header/Header";
import TodoForm from "../todoForm/TodoForm";
import TodoList from "../todoList/TodoList";

import "./content.css";

const Content = () => {
  return (
    <div>
      <Header />
      <TodoForm/>
      <TodoList />
    </div>
  );
};

export default Content;
