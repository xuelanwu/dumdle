import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/session";

import HomeSideBar from "./HomeSideBar";
import HomeMainContainer from "./HomeMainContainer";

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getProfile(user.id)).catch(async (res) => {
      const data = await res.json();
      console.log(data);
    });
  }, [user]);

  if (!user) return null;
  return (
    <div className="page-container home">
      <HomeSideBar />
      <HomeMainContainer />
    </div>
  );
};
export default HomePage;
