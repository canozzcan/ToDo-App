import "./todoForm.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../../redux/Todos/todosSlice";

import Loading from "../loading/Loading";
import Error from "../error/Error";

const TodoForm = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading);
  const error = useSelector((state) => state.todos.addNewTodoError);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addTodoAsync({ content }));
    setContent("");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          disabled={isLoading || error}
          className="new-todo"
          placeholder="Write your new To Do and press Enter"
          autoFocus
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {isLoading && <Loading />}
        {error && <Error message={error} />}
      </form>
    </div>
  );
};

export default TodoForm;
