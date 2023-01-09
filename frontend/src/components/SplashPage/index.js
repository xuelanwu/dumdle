import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "../Navigation";

import left from "../../assets/109610701.jpg";
import mid from "../../assets/109610705.jpg";
import right from "../../assets/109610711.jpg";

import "./index.css";

const SplashPage = ({ isLoaded }) => {
  const user = useSelector((state) => state.session.user);

  const history = useHistory();

  const handleSignup = () => {
    history.push("/signup");
  };

  const handleLogin = () => {
    history.push("/login");
  };

  if (user) return <Redirect to="/home" />;
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="title-container">
        <div className="title-block">
          <h1>Make the first move</h1>
          <p>
            Start meeting the dogs in your area! If you already have an acount,
            sign in to use Dumdle on the web.
          </p>
          <div className="title-buttons-block">
            <button className="title-signup" onClick={handleSignup}>
              Join
            </button>
            <button className="title-login" onClick={handleLogin}>
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="three-subtitle-container">
        <div className="subtitle-block">
          <h2>We’re not just for dating anymore</h2>
        </div>
        <div className="three-img-grid-container">
          <img src={left} className="small-left-img"></img>
          <img src={mid} className="small-mid-img"></img>
          <img src={right} className="small-right-img"></img>
          <p className="splash-left-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Mauris vel
            nunc at neque maximus elementum ultrices eu ipsum.
          </p>
          <p className="splash-mid-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="splash-right-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id
            massa lobortis, consequat augue sed, commodo ligula.
          </p>
          <div className="lear-more-box">
            <button className="learn-more-button">Learn More</button>
          </div>
          <div className="lear-more-box">
            <button className="learn-more-button">Learn More</button>
          </div>
          <div className="lear-more-box">
            <button className="learn-more-button">Learn More</button>
          </div>
        </div>
      </div>

      <div className="title-container carousel">
        <div className="title-block">
          <h1>Make the first move</h1>
          <p>
            Start meeting the dogs in your area! If you already have an acount,
            sign in to use Dumdle on the web.
          </p>
          <div className="title-buttons-block">
            <button className="learn-more-button">Learn More</button>
          </div>
        </div>
      </div>
      <div className="footet-container">
        <div className="footer-about-logo">
          <i className="fa-solid fa-paw fa-2xl"></i>
          <p>dumdle</p>
        </div>
        <a
          href="https://github.com/xuelanwu"
          className="about-contact splash-contact"
        >
          <i className="fa-brands fa-github fa-2xl"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/xuelan-wu-ba354a1b0/"
          className="about-contact splash-contact"
        >
          <i className="fa-brands fa-linkedin fa-2xl"></i>
        </a>
      </div>
    </>
  );
};

export default SplashPage;
