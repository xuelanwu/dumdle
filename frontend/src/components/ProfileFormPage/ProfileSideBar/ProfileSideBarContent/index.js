import { useSelector } from "react-redux";

import LogoutModal from "../../../LogoutModal";

import "./index.css";

const ProfileSideBarContent = () => {
  const dog = useSelector((state) => state.profile);
  return (
    <div className="sidebar-content-container profile">
      <p>Edit profile</p>
      <LogoutModal />
    </div>
  );
};

export default ProfileSideBarContent;
