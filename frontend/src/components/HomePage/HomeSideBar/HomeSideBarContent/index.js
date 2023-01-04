import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatches } from "../../../../store/friend";
import { getProfile } from "../../../../store/session";

import "./index.css";

const HomeSideBarContent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const dog = useSelector((state) => state.session.profile);
  const matches = useSelector((state) => state.friend.matched);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getProfile(user.id))
      .then((dog) => dispatch(getMatches(dog.id)))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }, [dispatch]);

  if (!dog) return null;

  return (
    <div className="sidebar-content-container home">
      {matches && Object.values(matches).length > 0 ? (
        <div className="matches-container">
          <h1>Matches</h1>
          {Object.values(matches).map((matchedDog) => (
            <div className="matches-block">
              <div className="sidebar-avatar-block matches-box avatar">
                <img src={matchedDog.DogImages[0].url}></img>
              </div>
              <div className="matches-box name">{matchedDog.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="matches-container">
          <h1>Get your matches here</h1>
        </div>
      )}
    </div>
  );
};

export default HomeSideBarContent;
