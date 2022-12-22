import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import NavLogo from "../NavLogo";

import "./index.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  const handleApple = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({
        credential: "user1@user.io",
        password: "password1",
      })
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
        credential: "user2@user.io",
        password: "password2",
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="auth-container">
      <NavLogo />
      <div className="auth-block">
        <h2>Welcome! How do you want to get started?</h2>
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
        <div className="user-form-divider-block">
          <div className="user-form-divider">
            <div className="divider-line"></div>
            <span>or</span>
            <div className="divider-line"></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="user-form">
          <ul>
            {errors.length > 0 ? (
              errors.map((error, idx) => <li key={idx}>{error}</li>)
            ) : (
              <p>Sign up with your email instead</p>
            )}
          </ul>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
