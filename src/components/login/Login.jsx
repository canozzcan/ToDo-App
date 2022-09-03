import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Auth/authSlice";

import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName ] = useState('');

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Enter Your Name</h2>
        <form>
          <div className="formControl">
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <button onClick={() => dispatch(login(name))} className="btn">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
