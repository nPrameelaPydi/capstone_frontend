import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotfoundPage.jsx";
import Nav from "./components/Nav.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import ChatsPage from "./pages/ChatsPage";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import UserProfile from "./pages/UserProfilePage.jsx";
import SingleRecipePage from "./pages/SingleRecipePage.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

import { useState, useEffect } from "react";

export default function App() {
  //const loggedInUserId = "673d188e31105f40ca5acd03";
  //useState to hold logged-in user's id
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  //useeffect hook to retrieve user's id from local storage on component mount
  useEffect(() => {
    //fetch userid from localStorage
    const userId = localStorage.getItem("userId");

    //if userid exists, update state with retrieved userid
    if (userId) {
      setLoggedInUserId(userId);
      console.log(`Logged in UserId: ${userId}`);
    } else {
      console.log("User not logged in");
    }
  }, []);

  return (
    <>
      <Nav loggedInUserId={loggedInUserId}></Nav>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/recipes" element={<RecipesPage />}></Route>
        <Route path="/recipes/:id" element={<SingleRecipePage />} />
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={<Login setLoggedInUserId={setLoggedInUserId} />}
        />
        <Route
          path="/profile"
          element={
            loggedInUserId ? (
              <UserProfile userId={loggedInUserId} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/chats" element={<ChatsPage />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
