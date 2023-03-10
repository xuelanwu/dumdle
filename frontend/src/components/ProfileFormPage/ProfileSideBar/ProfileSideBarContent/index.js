import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LogoutModal from "../../../LogoutModal";

import "./index.css";

const ProfileSideBarContent = () => {
  const dog = useSelector((state) => state.session.profile);
  return (
    <div className="sidebar-content-container profile">
      {dog ? <p>Edit profile</p> : <p>Create profile</p>}
      <Link
        to="/about"
        className="about-link
      "
      >
        <p>About</p>
      </Link>
      <LogoutModal />
    </div>
  );
};

export default ProfileSideBarContent;
