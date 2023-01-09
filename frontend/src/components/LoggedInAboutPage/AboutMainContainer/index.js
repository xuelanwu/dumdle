import AboutMainContent from "./AboutMainContent";
import AboutMainHeader from "./AboutMainHeader";
import "./index.css";

const AboutMainContainer = () => {
  return (
    <div className="main-container profile about">
      <AboutMainHeader />
      <AboutMainContent />
    </div>
  );
};

export default AboutMainContainer;
