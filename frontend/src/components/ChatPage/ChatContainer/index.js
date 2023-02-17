import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sendMessage } from "../../../store/chat";

import "./index.css";

const ChatContainer = ({
  room,
  friend,
  dog,
  messages,
  handleLeave,
  socket,
}) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    dispatch(sendMessage(room, dog.id, message)).catch(async (res) => {
      const data = await res.json(res);
      console.log(data);
      if (data && data.errors) setErrors(data.errors);
    });
    // socket.emit("message", message, room);
  };

  // const handleLeave = () => {
  //   setUsername("");
  // };
  const handleClose = (e) => {
    e.prevent.default();
    history.push("/home");
  };

  return (
    <div className="main-container chat">
      <div className="main-title-container chat">
        <div className="main-title-block chat">
          <div className="sidebar-avatar-block">
            <img src={friend.dog.DogImages[0].url} alt="avatar-blue"></img>
          </div>
          <h3>{friend.dog.name}</h3>
        </div>
        <div className="close-button-block chat">
          <button className="close-button" onClick={handleClose}>
            <i className="fa-solid fa-xmark fa-2xl"></i>
          </button>
        </div>
      </div>
      <div className="message-container">
        {messages &&
          messages.length > 0 &&
          messages.map((msg, idx) => (
            <div
              key={`msg-${idx}`}
              className={`message-block  ${
                msg.senderId === friend.dog.id ? "received" : "sent"
              }`}
            >
              <p className={`message-box`}>{msg.message}</p>
            </div>
          ))}
      </div>
      <div className="input-container">
        <div className="input-block">
          <input type="text" value={message} onChange={handleOnChange} />
          <button
            onClick={handleSendMessage}
            className={`send-button ${
              message ? "highlight-send-button" : "grey-send-button"
            }`}
          >
            <i className="fa-solid fa-paper-plane fa-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
