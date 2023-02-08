import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";

import { getProfile } from "../../store/session";
import { getDog } from "../../store/friend";

import HomeSideBar from "../HomeSideBar";
import ChatContainer from "./ChatContainer";

const ChatPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dog = useSelector((state) => state.session.profile);

  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getProfile(user.id))
      .then((dog) => {
        if (dog) {
          dispatch(getDog(dog.id));

          console.log("********* dog");
        } else {
          return history.push("/profile");
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        console.log(data);
        if (data && data.errors) setErrors(data.errors);
      });
  }, [dispatch]);

  if (!dog) return null;
  return (
    <div className="page-container home">
      <HomeSideBar />
      {user && <ChatContainer />}
    </div>
  );
};
export default ChatPage;
