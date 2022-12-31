import HomeMainHeader from "./HomeMainHeader";
import HomeMainContent from "./HomeMainContent";

import "./index.css";

const HomeMainContainer = () => {
  return (
    <div className="main-container home">
      <HomeMainHeader />
      <HomeMainContent />
    </div>
  );
};

export default HomeMainContainer;
