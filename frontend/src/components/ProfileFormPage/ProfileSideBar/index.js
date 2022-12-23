import ProfileSideBarContent from "./ProfileSideBarContent";
import ProfileSideBarHeader from "./ProfileSideBarHeader";

const ProfileSideBar = () => {
  return (
    <div className="side-container">
      <ProfileSideBarHeader />
      <ProfileSideBarContent />
    </div>
  );
};

export default ProfileSideBar;
