import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/profile";
import ProfileMainContainer from "./ProfileMainContainer";

import ProfileSideBar from "./ProfileSideBar";

import "./index.css";

const ProfileFormPage = () => {
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
    <div className="page-container profile">
      <ProfileSideBar />
      <ProfileMainContainer />
    </div>
  );
};
export default ProfileFormPage;
