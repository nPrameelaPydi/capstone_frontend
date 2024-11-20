import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [userInput, setUserInput] = useState("");
  const [msgs, setMsgs] = useState([]);
  const inputref = useRef(null);

  useEffect(() => {
    inputref.current.focus();
  }, []);
  useEffect(() => {
    const createChat = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/chats");
        console.log(res.data);
        //const newChat =
      } catch (err) {
        console.error(err);
      }
    };
    createChat();
  }, []);

  const handleChange = (e) => {
    const text = e.target.value.trim();
    console.log(text);
    setUserInput(text);
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(`data: ${userInput}`);
      const msg = {
        role: "user",
        content: userInput,
      };
      setMsgs([...msgs, msg]);
      setUserInput("");
      inputref.current.focus();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>Chat</h1>
      <div>
        <div>
          {msgs.map((m, i) => (
            <div key={i}>
              <p>{`${m.role.toUpperCase()}: ${m.content}`}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} action="">
          <label htmlFor="">
            <input
              type="text"
              name="userInput"
              value={userInput}
              ref={inputref}
              onChange={handleChange}
            />
          </label>
          <button>Send</button>
        </form>
      </div>
    </main>
  );
}
