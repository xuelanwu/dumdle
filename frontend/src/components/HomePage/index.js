import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { addFriend, getDog } from "../../store/friend";

import HomeSideBar from "./HomeSideBar";
import HomeMainContainer from "./HomeMainContainer";
import { useEffect, useState } from "react";
import { getProfile } from "../../store/session";
import { SDK_VERSION } from "firebase/app";

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const dog = useSelector((state) => state.session.profile);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getProfile(user.id))
      .then((dog) => dispatch(getDog(dog.id)))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }, [dispatch]);

  if (!user) return null;
  if (!dog) return null;
  return (
    <div className="page-container home">
      <HomeSideBar />
      <HomeMainContainer />
    </div>
  );
};
export default HomePage;
