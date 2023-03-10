import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./index.css";

const HomeSideBarHeader = () => {
  const dog = useSelector((state) => state.session.profile);

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/profile");
  };

  return (
    <div className="sidebar-header-container home" onClick={handleClick}>
      <div className="sidebar-avatar-block">
        {dog && dog.DogImages && dog.DogImages.length > 0 ? (
          <img src={dog.DogImages[0].url} alt="avatar-blue"></img>
        ) : (
          <img
            src="https://as2.ftcdn.net/v2/jpg/04/44/09/99/1000_F_444099983_r9sdFx5TbPGYfZ6SgdX1INthjDUgio5V.jpg"
            alt="avatar-orange"
          ></img>
        )}
      </div>
      <div className="sidebar-name-block">
        {dog ? <h2>{dog.name}</h2> : <h2>Welcome</h2>}
      </div>
    </div>
  );
};

export default HomeSideBarHeader;
