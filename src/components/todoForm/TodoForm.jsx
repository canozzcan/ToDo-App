import "./todoForm.css";

import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../../redux/Todos/todosSlice";

import Loading from "../loading/Loading";
import Error from "../error/Error";

const TodoForm = ({content, setContent}) => {
  
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading);
  const error = useSelector((state) => state.todos.addNewTodoError);

  const handleSubmit = async (e) => {
    if (content.length < 3) {
      alert("To do must contain at least 3 characters");
      return;
    }
    e.preventDefault();

    await dispatch(addTodoAsync({ content }));
    setContent("");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          disabled={isLoading || error }
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
