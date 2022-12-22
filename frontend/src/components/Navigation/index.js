import NavLogo from "../NavLogo";
import "./index.css";

import ProfileButton from "./ProfileDropdown";

const Navigation = ({ isLoaded }) => {
  return (
    <div className="nav-container">
      <ul className="nav-bar">
        <NavLogo />
        <div className="nav-block-buttons nav-buttons">
          <li className="nav-items dropdown">
            {isLoaded && <ProfileButton />}
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
