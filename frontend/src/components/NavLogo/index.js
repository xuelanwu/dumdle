import { NavLink } from "react-router-dom";

import "./index.css";

const NavLogo = () => {
  return (
    <div className="nav-block-logo">
      <li className="nav-items logo">
        <NavLink exact to="/" className="nav-items">
          <i className="fa-solid fa-paw fa-2xl"></i>
          <p>dumdle</p>
        </NavLink>
      </li>
    </div>
  );
};

export default NavLogo;
