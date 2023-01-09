import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/session";

import AboutMainContainer from "./AboutMainContainer";
import AboutSideBar from "./AboutSideBar";

import "./index.css";

const LoggedInAboutPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  if (!user) return null;
  return (
    <div className="page-container profile">
      <AboutSideBar />
      <AboutMainContainer />
    </div>
  );
};
export default LoggedInAboutPage;
