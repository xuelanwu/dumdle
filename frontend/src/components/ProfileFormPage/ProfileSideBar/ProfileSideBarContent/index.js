import { useSelector } from "react-redux";

import LogoutModal from "../../../LogoutModal";

import "./index.css";

const ProfileSideBarContent = () => {
  const dog = useSelector((state) => state.session.profile);
  return (
    <div className="sidebar-content-container profile">
      {dog ? <p>Edit profile</p> : <p>Create profile</p>}
      <LogoutModal />
    </div>
  );
};

export default ProfileSideBarContent;
