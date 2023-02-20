import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { useSocket } from "../../context/Socket";

import { getProfile } from "../../store/session";
import { getDog } from "../../store/friend";
import { getChats, getFriend } from "../../store/chat";

import HomeSideBar from "../HomeSideBar";
import ChatContainer from "./ChatContainer";
import { async } from "@firebase/util";

const ChatPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dog = useSelector((state) => state.session.profile);
  const friend = useSelector((state) => state.chat.friend);
  const chats = useSelector((state) => state.chat.chats);
  const { room } = useParams();

  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState([]);

  const socket = useSocket();

  useEffect(() => {
    dispatch(getFriend(room)).catch(async (res) => {
      const data = await res.json(res);
      console.log(data);
      if (data && data.errors) setErrors(data.errors);
    });
    dispatch(getChats(room))
      .then((data) => {
        setMessages(data);
      })
      .catch(async (res) => {
        const data = await res.json(res);
        console.log(data);
        if (data && data.errors) setErrors(data.errors);
      });

    if (dog) socket.emit("login", dog.id);
  }, [dispatch, dog, room]);

  useEffect(() => {
    socket.on("message", (arg) => {
      dispatch(getChats(room))
        .then((data) => {
          setMessages(data);
        })
        .catch(async (res) => {
          const data = await res.json(res);
          console.log(data);
          if (data && data.errors) setErrors(data.errors);
        });
    });
  }, [socket]);

  useEffect(() => {
    if (chats) {
      const msgArr = Object.values(chats);
      setMessages(msgArr);
    }
  }, [chats]);

  // useEffect(() => {
  //   return setMessages((messages) => [...messages, ...chats]);
  // }, [chats]);

  // useEffect(() => {
  //   dispatch(getProfile(user.id))
  //     .then((dog) => {
  //       if (dog) {
  //         dispatch(getDog(dog.id));
  //       } else {
  //         return history.push("/profile");
  //       }
  //     })
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       console.log(data);
  //       if (data && data.errors) setErrors(data.errors);
  //     });
  // }, [dispatch]);

  if (!dog) return null;
  if (!friend) return null;

  return (
    <div className="page-container home">
      <HomeSideBar />
      {user && (
        <ChatContainer
          messages={messages}
          socket={socket}
          room={room}
          friend={friend}
          dog={dog}
        />
      )}
    </div>
  );
};
export default ChatPage;
