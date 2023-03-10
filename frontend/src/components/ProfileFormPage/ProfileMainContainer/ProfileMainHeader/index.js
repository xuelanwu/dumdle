import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.css";

const ProfileMainHeader = () => {
  const history = useHistory();
  const dog = useSelector((state) => state.session.profile);
  const handleClose = (e) => {
    e.preventDefault();
    if (dog) history.push("/home");
    else history.push("/");
  };
  return (
    <div className="main-title-container profile">
      <div className="main-title-block">
        <h3>Dog profile</h3>
      </div>
      <div className="close-button-block">
        {dog && (
          <button className="close-button" onClick={handleClose}>
            <i className="fa-solid fa-xmark fa-2xl"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileMainHeader;
