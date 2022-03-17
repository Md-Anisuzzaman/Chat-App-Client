import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>FeedoChat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
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
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;


































//import React, { useEffect } from 'react';
//import Join from '../Join/Join';
//import './Chat.css';
//import { user } from '../Join/Join'
//import { io } from "socket.io-client";


 //const ENDPOINT = "http://localhost:5000/";
//const socket = io.connect("http://localhost:5000/");

//const Chat = () => {
    //const socket = io(socket, { transports: ['webSocket'] });


    // useEffect(() => {
    //     socket.on('connect', () => {
    //         alert('connected');
    //     })

    //     socket.on("connected", (arg) => {
    //         console.log(arg); // "world"
    //         alert("got it");
    //       });

    //     return () => {

    //     }
    // }, [])

    // useEffect(() => {
    //     socket('connect', () => {
    //         alert('connected');
    //     })
    //     return () => {

    //     }
    // }, [])


//     return (
//         <div className='chatPage'>
//             <div className="header"></div>
//             <div className="chatBox"></div>
//             <div className="inpubox">
//                 {user}
//             </div>

//         </div>
//     );
// };

// export default Chat;