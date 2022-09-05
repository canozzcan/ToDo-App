import "./todoList.css";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTodos,
  getTodosAsync,
  toggleTodoAsync,
  removeTodoAsync,
} from "../../redux/Todos/todosSlice";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import EditTodo from "../editTodo/EditTodo";

const TodoList = ({ content, setContent }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [takeId, setTakeId] = useState(0);

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
    <>
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

              <IconButton
                onClick={() => {
                  setTakeId(item.id);
                  setShowEditTodo(true);
                }}
                className="icon"
              >
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

      {showEditTodo && (
        <EditTodo
          takeId={takeId}
          content={content}
          setContent={setContent}
          setShowEditTodo={setShowEditTodo}
        />
      )}
    </>
  );
};

export default TodoList;
