import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDog,
  likeFriend,
  addFriend,
  blockFriend,
} from "../../../../store/friend";
import "./index.css";

const HomeMainContent = () => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.session.profile);
  const newDog = useSelector((state) => state.friend.dog);
  const friend = useSelector((state) => state.friend.friendship);
  const [page, setPage] = useState(1);
  const [errors, setErrors] = useState([]);

  const [scrolling, setScrolling] = useState(false);
  const [scrollDone, setScrollDone] = useState(true);

  const handleOnWheelCapture = (e) => {
    const scroll = e.deltaY;
    if (scrolling) setScrolling(false);
    if (scrollDone && Math.abs(scroll) > 50) setScrolling(true);
  };

  const handleOnWheel = (e) => {
    const scroll = e.deltaY;

    if (scrolling) {
      setScrollDone(false);
      if (page === 1) {
        if (scroll > 50) {
          const card = document.querySelector(".home-content-block");
          card.style.transform = `translateY(-42vw)`;
          setPage((prev) => prev + 1);
        }
      } else if (page === 3) {
        if (scroll < -50) {
          const card = document.querySelector(".home-content-block");
          card.style.transform = `translateY(-${42}vw)`;
          setPage((prev) => prev - 1);
        }
      } else {
        if (scroll > 50) {
          const card = document.querySelector(".home-content-block");
          card.style.transform = `translateY(-${42 * 2}vw)`;
          setPage((prev) => prev + 1);
        }
        if (scroll < -50) {
          const card = document.querySelector(".home-content-block");
          card.style.transform = `translateY(0)`;
          setPage((prev) => prev - 1);
        }
      }
      setTimeout(() => {
        setScrollDone(true);
      }, 500);
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    return dispatch(likeFriend(friend.id))
      .then(() => dispatch(getDog(dog.id)))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleBlock = (e) => {
    e.preventDefault();
    console.log("*************** friend.id", friend);
    return dispatch(blockFriend(friend.id))
      .then(() => dispatch(getDog(dog.id)))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  if (!dog) return null;

  return (
    <div className="main-content-container home">
      {newDog ? (
        <div
          className="home-content-container"
          onWheelCapture={handleOnWheelCapture}
          onWheel={handleOnWheel}
        >
          <div className="home-content-block">
            <div className="home-content-card">
              <div className="home-content-card-split left">
                <img
                  src={newDog.DogImages && newDog.DogImages[0].url}
                  className="home-content-img"
                ></img>
              </div>
              <div className="home-content-card-split right">
                <h2>
                  {`${newDog.name}, ${newDog.age}`}{" "}
                  <span>
                    {newDog.gender === "female" ? (
                      <i className="fa-solid fa-venus"></i>
                    ) : newDog.gender === "male" ? (
                      <i className="fa-solid fa-mars"></i>
                    ) : (
                      <i className="fa-solid fa-neuter"></i>
                    )}
                  </span>
                </h2>
                <p className="home-content-breed">{newDog.breed}</p>
              </div>
            </div>

            <div className="home-content-card">
              <div className="home-content-card-nonsplit">
                <div className="home-content-card-nonsplit-text">
                  <div className="home-content-about-block">
                    <div className="home-content-about-icon">
                      <i className="fa-solid fa-ellipsis fa-2xs"></i>
                    </div>
                    <p className="home-content-about">
                      {` About ${newDog.name}`}
                    </p>
                  </div>
                  <p className="home-content-description">
                    {newDog.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="home-content-card">
              <div className="home-content-card-nonsplit">
                <img src={newDog.DogImages && newDog.DogImages[1].url}></img>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="home-content-container">
          <div className="home-content-block ">
            <div className="home-content-card boost">
              <div className="home-content-card-nonsplit boost">
                <h2>You've hit the end of the line —— for today!</h2>
                <p className="home-content-boost">
                  Want to see more amazing dog? Upgrade to Dumdle Boost, or wait
                  until tomorrow for more potential conections
                </p>
                <div className="upgrade-box">Upgrade —— coming soon</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {newDog && (
        <div className="home-button-container">
          <div className="home-button-block">
            <div className="home-button-box">
              <button className="block-button" onClick={handleBlock}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="home-button-box">
              <button className="like-button" onClick={handleLike}>
                <i className="fa-solid fa-check"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMainContent;
