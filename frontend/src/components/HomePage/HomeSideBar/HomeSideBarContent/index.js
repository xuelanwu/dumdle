import { useSelector } from "react-redux";

import "./index.css";

const HomeSideBarContent = () => {
  const dog = useSelector((state) => state.profile);
  return (
    <div className="sidebar-content-container profile">
      <p>Home</p>
    </div>
  );
};

export default HomeSideBarContent;
