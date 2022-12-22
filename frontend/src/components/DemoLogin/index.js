import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

const DemoLogin = () => {
  const [errors, setErrors] = useState([]);
  const handleApple = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({ credential: "demo@user.io", password: "password" })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };
  const handleFacebook = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({
        credential: "demo1@user.io",
        password: "password1",
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };
  return (
    <div className="user-button-container">
      <button className="apple-button" onClick={handleApple}>
        <i className="fa-brands fa-apple fa-xl"></i>
        <span>Continue as Demo1</span>
      </button>
      <button className="facebook-button" onClick={handleFacebook}>
        <i className="fa-brands fa-facebook fa-lg"></i>
        <span>Continue as Demo2</span>
      </button>
    </div>
  );
};

export default DemoLogin;
