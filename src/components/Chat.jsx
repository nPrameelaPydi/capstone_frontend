import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // create a new chat on the first render
  useEffect(() => {
    const createChat = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/chats");
        console.log(res.data);
        setCurrentChat(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    createChat();
  }, []);

  const handleChange = (e) => {
    const text = e.target.value.trim();
    console.log(text);
    setUserInput(text);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(`Data: ${userInput}`);

      const message = {
        role: "user",
        content: userInput,
      };
      console.log(`//////////******/////////////////////////`);
      console.log(currentChat);
      console.log(currentChat.newChat._id);
      console.log(`//////////******/////////////////////////`);

      // POST
      const res = await axios.post(
        `http://localhost:3000/api/chats/${currentChat.newChat._id}/message`,
        message
      );
      console.log(res.data);

      // setMessages([...messages, message]);
      setMessages(res.data.messages);

      setUserInput("");
      // inputRef.current.focus();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {/* MESSAGES  */}
      <div>
        {messages.map((m, i) => (
          <div key={i}>
            <p>{m.role}</p>
            <p>{m.content}</p>
          </div>
        ))}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="userInput"
            value={userInput}
            ref={inputRef}
            onChange={handleChange}
          />
        </label>

        <button>Send</button>
      </form>
    </div>
  );
}
