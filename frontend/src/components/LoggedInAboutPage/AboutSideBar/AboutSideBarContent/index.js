import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LogoutModal from "../../../LogoutModal";

import "./index.css";

const AboutSideBarContent = () => {
  const dog = useSelector((state) => state.session.profile);
  return (
    <div className="sidebar-content-container profile">
      <Link to="/profile" className="profile-link">
        <p>Profile</p>
      </Link>
      <p>About</p>
      <LogoutModal />
    </div>
  );
};

export default AboutSideBarContent;
