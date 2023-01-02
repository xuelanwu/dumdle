import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";

const HomeMainContent = () => {
  const dog = useSelector((state) => state.session.profile);
  const [page, setPage] = useState(1);

  const [scrolling, setScrolling] = useState(false);
  const [scrollDone, setScrollDone] = useState(true);

  useEffect(() => {
    console.log(dog);
  }, [dog]);

  const handleOnWheelCapture = (e) => {
    const scroll = e.deltaY;
    if (scrolling) setScrolling(false);
    if (scrollDone && Math.abs(scroll) > 50) setScrolling(true);
  };

  const handleOnWheel = (e) => {
    const scroll = e.deltaY;
    console.log("****************** wheel", scroll);
    console.log("****************** wheel done", scrollDone);
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

  if (!dog) return null;
  return (
    <div className="main-content-container home">
      <div
        className="home-content-container"
        onWheelCapture={handleOnWheelCapture}
        onWheel={handleOnWheel}
        onTr
      >
        <div className="home-content-block">
          <div className="home-content-card">
            <div className="home-content-card-split left">
              <img
                src={dog.DogImages[0].url}
                className="home-content-img"
              ></img>
            </div>
            <div className="home-content-card-split right">
              <h2>
                {`${dog.name}, ${dog.age}`}{" "}
                <span>
                  {dog.gender === "female" ? (
                    <i className="fa-solid fa-venus"></i>
                  ) : dog.gender === "male" ? (
                    <i className="fa-solid fa-mars"></i>
                  ) : (
                    <i className="fa-solid fa-neuter"></i>
                  )}
                </span>
              </h2>
              <p>{dog.breed}</p>
            </div>
          </div>

          <div className="home-content-card">
            <div className="home-content-card-nonsplit">
              <p>
                <span>
                  <i className="fa-solid fa-ellipsis"></i>
                </span>
                {` About ${dog.name}`}
              </p>
              <p>{dog.description}</p>
            </div>
          </div>

          <div className="home-content-card">
            <div className="home-content-card-nonsplit">
              <img src={dog.DogImages[1].url}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMainContent;
