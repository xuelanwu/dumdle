import { useHistory } from "react-router-dom";
import "./index.css";

const ProfileMainHeader = () => {
  const history = useHistory();
  const handleClose = () => {
    history.push("/home");
  };
  return (
    <div className="main-title-container profile">
      <div className="main-title-block">
        <h3>Dog profile</h3>
      </div>
      <div className="close-button-block">
        <button className="close-button" onClick={handleClose}>
          <i className="fa-solid fa-xmark fa-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default ProfileMainHeader;
