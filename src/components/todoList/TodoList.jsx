import "./todoList.css";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTodos,
  getTodosAsync,
  toggleTodoAsync,
  removeTodoAsync
} from "../../redux/Todos/todosSlice";
import Loading from "../loading/Loading";
import Error from "../error/Error";

const TodoList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleToggle = async (id, isCompleted) => {
    await dispatch(toggleTodoAsync({ id, data: { isCompleted } }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="todo-list">
      {items.map((item) => (
        <div
          key={item.id}
          className={item.isCompleted ? "card completed" : "card"}
        >
          <h3>{item.content}</h3>
          <div className="buttons">
            <IconButton
              className="icon"
              onClick={() => handleToggle(item.id, !item.isCompleted)}
            >
              <CheckIcon />
            </IconButton>
            <IconButton className="icon">
              <EditIcon />
            </IconButton>
            <IconButton
              className="icon"
              onClick={() => dispatch(removeTodoAsync(item.id))}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
