import { useState } from "react";

// import socket from "../../../socket";

import "./index.css";

const ChatContainer = ({ messages, handleSendMessage, handleLeave }) => {
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  // const handleSendMessage = (message) => {
  //   const newMessage = {
  //     id: uuidv4(),
  //     username,
  //     message,
  //     created: new Date(),
  //   };
  //   const jsonNewMessage = JSON.stringify({
  //     type: "send-chat-message",
  //     data: newMessage,
  //   });
  //   console.log(`Sending message ${jsonNewMessage}...`);
  //   webSocket.current.send(jsonNewMessage);
  // };

  // const handleLeave = () => {
  //   setUsername("");
  // };
  console.log("********* cr msg", messages);
  return (
    <div className="chat-container">
      <div className="message-container">
        {messages &&
          messages.length > 0 &&
          messages.map((m) => (
            <p>
              {m.username}:{m.message}
            </p>
          ))}
      </div>
      <div>
        <input type="text" value={message} onChange={handleOnChange} />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatContainer;
