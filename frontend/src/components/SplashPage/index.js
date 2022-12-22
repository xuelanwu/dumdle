import { useHistory } from "react-router-dom";
import Navigation from "../Navigation";

import "./index.css";

const SplashPage = ({ isLoaded }) => {
  const history = useHistory();

  const handleSignup = () => {
    history.push("/signup");
  };

  const handleLogin = () => {
    history.push("/login");
  };

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
    </>
  );
};

export default SplashPage;
