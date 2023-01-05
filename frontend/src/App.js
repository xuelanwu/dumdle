import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { getProfile } from "./store/session";
import * as sessionActions from "./store/session";

import ProtectedRoute from "./components/ProtectedRoute";

import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import ProfileFormPage from "./components/ProfileFormPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getProfile(user.id));
    }
  }, [user]);

  if (!isLoaded) {
    return null;
  }
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <SplashPage isLoaded={isLoaded} />
        </Route>

        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <ProtectedRoute path="/home">
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfileFormPage />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
