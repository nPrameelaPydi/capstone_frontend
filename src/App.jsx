import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import NotFound from "../pages/NotfoundPage.jsx";
import Nav from "../components/Nav.jsx";
import RecipesPage from "../pages/RecipesPage.jsx";
import ChatsPage from "../pages/ChatsPage";
import Register from "../pages/RegistrationPage.jsx";
import Login from "../pages/LoginPage.jsx";

export default function App() {
  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/recipes" element={<RecipesPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/chats" element={<ChatsPage />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}
