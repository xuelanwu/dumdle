import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";

const HomeMainContent = () => {
  const dog = useSelector((state) => state.session.profile);
  useEffect(() => {
    console.log(dog);
  }, [dog]);

  if (!dog) return null;
  return (
    <div className="main-content-container home">
      <div className="home-content-container">
        <div className="home-content-card">home</div>
      </div>
    </div>
  );
};

export default HomeMainContent;
