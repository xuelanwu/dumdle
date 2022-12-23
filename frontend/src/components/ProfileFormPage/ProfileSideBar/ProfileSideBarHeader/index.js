import { useSelector } from "react-redux";
import "./index.css";

const ProfileSideBarHeader = () => {
  const dog = useSelector((state) => state.profile);
  return (
    <div className="sidebar-header-container profile">
      <div className="sidebar-header-arrow-block">
        <i className="fa-solid fa-angle-left"></i>
      </div>
      <div className="sidebar-avatar-block">
        {dog ? (
          <img
            src="https://t3.ftcdn.net/jpg/04/44/10/00/360_F_444100062_rwlBPINVcBApM1FZN9riHK8ALswAvkdh.jpg"
            alt="avatar-blue"
          ></img>
        ) : (
          <img
            src="https://as2.ftcdn.net/v2/jpg/04/44/09/99/1000_F_444099983_r9sdFx5TbPGYfZ6SgdX1INthjDUgio5V.jpg"
            alt="avatar-orange"
          ></img>
        )}
      </div>
    </div>
  );
};

export default ProfileSideBarHeader;
