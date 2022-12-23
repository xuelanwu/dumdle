import { useSelector } from "react-redux";
import "./index.css";

const ProfileSideBarContent = () => {
  const dog = useSelector((state) => state.profile);
  return <div className="sidebar-content-container profile">Profile</div>;
};

export default ProfileSideBarContent;
