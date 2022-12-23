import ProfileMainHeader from "./ProfileMainHeader";
import ProfileMainContent from "./ProfileMainContent";

import "./index.css";

const ProfileMainContainer = () => {
  return (
    <div className="main-container profile">
      <ProfileMainHeader />
      <ProfileMainContent />
    </div>
  );
};

export default ProfileMainContainer;
