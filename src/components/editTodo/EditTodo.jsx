import "./editTodo.css";

import { useDispatch } from "react-redux";
import { editTodoAsync} from "../../redux/Todos/todosSlice";

const EditTodo = ({ takeId, content, setContent, setShowEditTodo }) => {
  const dispatch = useDispatch();

  const handleEdit = async (id, content) => {
    if (content.length < 3) {
      alert("To do must contain at least 3 characters");
      return;
    }
    
    await dispatch(editTodoAsync({ id, data: { content } }));
    setShowEditTodo(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit ToDo</h2>
        <form>
          <div className="formControl">
            <input
              type="text"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <button className="btn" onClick={() => setShowEditTodo(false)}>
              Cancel
            </button>
            <button onClick={() => handleEdit(takeId, content)} className="btn">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
