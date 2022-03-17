import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './ChatBoox.css'



const Chat = ({ socket, username, room, image, loggedIn,handleLogout }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('history')) setMessageList(JSON.parse(localStorage.getItem('history')))
  }, [])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(messageList));
  }, [messageList]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        image: image,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      console.log(currentMessage);
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h1>{username}</h1>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent,index) => {
            return (
              <div 
                key = {index}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="write..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        {/* <button onClick={sendMessage}>&#9658;</button> */}
        <button onClick={sendMessage}><i className="fa-regular fa-paper-plane"></i></button>
      </div>
      <button className="joinOut" onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Chat;