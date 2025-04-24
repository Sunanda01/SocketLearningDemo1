import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:8000/");

function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    //listen to server
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendmsg = () => {
    if (message.trim() !== "") {
      //send from client to server
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div>
      {messages.map((m, id) => (
        <>
          <span key={id}>{m}</span>
          <br />
        </>
      ))}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendmsg}>Send</button>
    </div>
  );
}

export default ChatApp;
