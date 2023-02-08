import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatches, getPendings } from "../../../store/friend";
import { getProfile } from "../../../store/session";
import { useHistory } from "react-router-dom";

import "./index.css";

const HomeSideBarContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dog = useSelector((state) => state.session.profile);
  const matches = useSelector((state) => state.friend.matched);
  const pendings = useSelector((state) => state.friend.pending);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (dog) {
      dispatch(getMatches(dog.id)).catch(async (res) => {
        const data = await res.json();
        console.log(data);
        if (data && data.errors) setErrors(data.errors);
      });
      dispatch(getPendings(dog.id)).catch(async (res) => {
        const data = await res.json();
        console.log(data);
        if (data && data.errors) setErrors(data.errors);
      });
    } else {
      return history.push("/profile");
    }
  }, [dog]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
  };

  if (!dog) return null;

  return (
    <div className="sidebar-content-container home">
      {pendings && Object.values(pendings).length > 0 && (
        <div className="matches-container">
          <h1>Pending Queue</h1>
          {Object.values(pendings).map((pendingFriend) => (
            <div
              className="matches-block"
              key={`match-${pendingFriend.Dog.id}`}
            >
              <div className="sidebar-avatar-block matches-box avatar">
                <img src={pendingFriend.Dog.DogImages[0].url}></img>
              </div>
              <div className="matches-box name">{pendingFriend.Dog.name}</div>
            </div>
          ))}
        </div>
      )}
      {matches && Object.values(matches).length > 0 && (
        <div className="matches-container">
          <h1>Matches</h1>
          {Object.values(matches).map((matchedDog) => (
            <button
              className="matches-block"
              key={`match-${matchedDog.dog.id}`}
              value={matchedDog.friendId}
              onClick={handleClick}
            >
              <img
                className="matches-box avatar"
                src={matchedDog.dog.DogImages[0].url}
              ></img>
              <p className="matches-box name">{matchedDog.dog.name}</p>
            </button>
          ))}
        </div>
      )}
      {!matches && !pendings && (
        <div className="matches-container discover">
          <div className="matches-discover-container matches-discover-content">
            <div className="desktop-box">
              <i className="fa-solid fa-desktop fa-2xl"></i>
            </div>
            <h1>Get your matches here</h1>
            <p>Start discovering people to get matches</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSideBarContent;
