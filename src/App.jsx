import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotfoundPage.jsx";
import Nav from "./components/Nav.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import ChatsPage from "./pages/ChatsPage";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import UserProfile from "./pages/UserProfilePage.jsx";

export default function App() {
  const loggedInUserId = "673d188e31105f40ca5acd03";
  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/recipes" element={<RecipesPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/profile"
          element={<UserProfile userId={loggedInUserId} />}
        ></Route>

        <Route path="/chats" element={<ChatsPage />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}
