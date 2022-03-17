import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import logo from './images/logo.png'
import Chat from './Components/ChatBox/ChatBox';

const socket = io.connect("http://localhost:5000");


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [image, setImage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    let lData = JSON.parse(localStorage.getItem('user'));
    let lroomData = JSON.parse(localStorage.getItem('room'));
    if (localStorage.getItem('user')) setUsername(lData );
    if (localStorage.getItem('room')) setRoom(lroomData);
    if (lData && lroomData) {
      console.log('join conected');
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (username) localStorage.setItem('user', JSON.stringify(username));
    if (room) localStorage.setItem('room', JSON.stringify(room));
  }, [username, room]);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('room')
    setUsername('');
    setRoom('');
    localStorage.removeItem('history')
    setShowChat(false);
  }

  return (
    <div className="App">
      <div className="nav-header">
        <h1>Weolcome to FeedoChat</h1>
        {/* <p>{username}</p> */}
      </div>
      {!showChat ? (
        <div className="joinChatContainer">
          <h1>Feedo<span>Chat</span></h1>
          <img src={logo} alt="" />
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
            setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Log In</button>
        </div>
      ) : (
        <Chat socket={socket} handleLogout={handleLogout} username={username} room={room} />
      )}
    </div>
  );
}

export default App;