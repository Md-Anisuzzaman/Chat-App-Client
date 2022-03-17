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
    let userData = JSON.parse(localStorage.getItem('user'));
    let roomData = JSON.parse(localStorage.getItem('room'));
    let imgData = JSON.parse(localStorage.getItem('img'));

    if (localStorage.getItem('user')) setUsername(userData);
    if (localStorage.getItem('room')) setRoom(roomData);
    if (localStorage.getItem('img')) setImage(imgData);

    if (userData && roomData && imgData) {
      console.log('join conected');
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (username) localStorage.setItem('user', JSON.stringify(username));
    if (room) localStorage.setItem('room', JSON.stringify(room));
    if (image) localStorage.setItem('img', JSON.stringify(image));
  }, [username, room]);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const imgToBase64 = (e) => {
    let filesSelected = e.target.files;

    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var reader = new FileReader();

      reader.readAsDataURL(fileToLoad);
      reader.onload = e => setImage(e.target.result)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('room')
    localStorage.removeItem('img')
    setUsername('');
    setRoom('');
    setImage('');
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

          {
            image && <img src={image} alt="" />
          }
          <input className="image-load" onChange={(e) => imgToBase64(e)}
            accept="image/png, image/jpeg"
            type="file"
          />
          {/* <label for="f02">Add profile picture</label> */}

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