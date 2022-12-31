import { useHistory } from "react-router-dom";
import "./index.css";

const HomeMainHeader = () => {
  const history = useHistory();
  const handleClose = () => {
    history.push("/home");
  };
  return (
    <div className="main-title-container home">
      <div className="main-title-block home">
        <h3>dumdle</h3>
      </div>
      {/* <div className="close-button-block">
        <button className="close-button" onClick={handleClose}>
          <i className="fa-solid fa-xmark fa-2xl"></i>
        </button>
      </div> */}
    </div>
  );
};

export default HomeMainHeader;
