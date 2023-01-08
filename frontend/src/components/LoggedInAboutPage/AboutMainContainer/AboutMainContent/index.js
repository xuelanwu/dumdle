import "./index.css";
import { NavLink } from "react-router-dom";

const AboutMainContent = () => {
  return (
    <div className="main-content-container profile">
      <div className="about-container">
        <h1>What's Dumdle?</h1>
        <div className="about-content-container">
          <h3 className="about-content-title">Why Dumdle was created</h3>
          <p className="about-content-text">
            Dumble is a platform for connection -- for your favourite
            companions. Dumble is a great way to meet the cutest dog in your
            area that may just the energy you're looking for!
          </p>
          <p className="about-content-text">
            We can’t wait to see the special connection you create!{" "}
            <span>💛</span>
          </p>
        </div>
        <div className="about-content-container">
          <h3 className="about-content-title">How to Swipe </h3>
          <p className="about-content-text">
            In your Swipe Deck, you’ll be able to swipe yes or no on profiles.{" "}
          </p>
          <p className="about-content-text">
            If you swipe yes and the other member has already swiped yes, it’ll
            be a match!
          </p>
          <p className="about-content-text">
            If the other member hasn’t swiped yes on you because they haven’t
            come across your profile yet but they do later, you’ll find them in
            pending queue.
          </p>
          <p className="about-content-text">
            Both members have to swipe yes in order for a match to form and a
            chat to start.
          </p>

          <div className="about-logo-container">
            <div className="about-logo">
              <i className="fa-solid fa-paw fa-2xl"></i>
              <p>dumdle</p>
            </div>

            <a href="https://github.com/xuelanwu" className="about-contact">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMainContent;
