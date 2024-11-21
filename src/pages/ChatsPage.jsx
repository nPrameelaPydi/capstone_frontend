import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "../components/Chat.jsx";

export default function ChatsPage() {
  const [allChats, setAllChats] = useState([]);

  const fetchChats = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/chats");
      console.log(res.data);
      setAllChats(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <main>
      <h1>Chats Page</h1>
      <div>
        {allChats.map((c) => (
          <div key={c._id}>
            <p>{c.title}</p>
          </div>
        ))}
      </div>

      <Chat />
    </main>
  );
}
