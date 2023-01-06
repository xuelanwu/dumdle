import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.css";

const ProfileSideBarHeader = () => {
  const history = useHistory();
  const dog = useSelector((state) => state.session.profile);

  const handleClick = () => {
    if (dog) history.push("/home");
    else history.push("/");
  };

  return (
    <div className="sidebar-header-container profile" onClick={handleClick}>
      <div
        className={`sidebar-header-arrow-block ${dog ? "show" : "transparent"}`}
      >
        <i className="fa-solid fa-angle-left"></i>
      </div>
      <div className="sidebar-avatar-block">
        {dog && dog.DogImages ? (
          <img src={dog.DogImages[0].url} alt="avatar-blue"></img>
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
