import { useState } from "react";
import Header from "../header/Header";
import TodoForm from "../todoForm/TodoForm";
import TodoList from "../todoList/TodoList";

import "./content.css";

const Content = () => {
  const [content, setContent] = useState("");


  return (
    <div>
      <Header />
      <TodoForm content={content} setContent={setContent} />
      <TodoList content={content} setContent={setContent} />
    </div>
  );
};

export default Content;
