import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import NotFound from "../pages/NotfoundPage.jsx";
import Nav from "../components/Nav.jsx";
import RecipesPage from "../pages/RecipesPage.jsx";
import ChatsPage from "../pages/ChatsPage";

export default function App() {
  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/recipes" element={<RecipesPage />}></Route>

        <Route path="/chats" element={<ChatsPage />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}
