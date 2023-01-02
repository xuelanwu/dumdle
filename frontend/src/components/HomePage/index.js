import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import HomeSideBar from "./HomeSideBar";
import HomeMainContainer from "./HomeMainContainer";

const HomePage = () => {
  const user = useSelector((state) => state.session.user);
  const dog = useSelector((state) => state.session.profile);

  if (!user) return null;
  if (!dog) return <Redirect to="/profile" />;
  return (
    <div className="page-container home">
      <HomeSideBar />
      <HomeMainContainer />
    </div>
  );
};
export default HomePage;
