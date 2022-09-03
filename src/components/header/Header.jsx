import React from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Auth/authSlice";

import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user);

  return (
    <div className="header">
      <div className="nav">
        <h1>Hello, {userName}</h1>
        <button className="btn_login" onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
