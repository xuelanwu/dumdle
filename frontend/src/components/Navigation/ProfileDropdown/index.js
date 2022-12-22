import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../../../store/session";
import "./index.css";

const ProfileButton = ({}) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="profile-dropdown-container">
      <button className="profile-dropdown-menu-button" onClick={openMenu}>
        <div className="profile-menu-icon">
          <i className="fa-solid fa-bars"></i>
        </div>
      </button>
      {/* {showMenu && (
        <ul className="profile-dropdown-menu-container">
          <li className="profile-dropdown-menu-button-box">
            <button className="profile-dropdown-button signup">Sign Up</button>
          </li>
          <li className="profile-dropdown-menu-button-box">
            <button>Log In</button>
          </li>
        </ul>
      )} */}
    </div>
  );
};

export default ProfileButton;
