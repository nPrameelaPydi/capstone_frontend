//import { Link } from "react-router-dom";

//export default function Nav({ loggedInUserId }) {
//  return (
//    <nav>
//      <Link to="/">Home</Link>
//      <Link to="/recipes">Recipes</Link>

//      {loggedInUserId ? <Link to="/profile"></Link> : <Link to="/login"></Link>}

//      <Link to="/profile">Profile</Link>
//      <Link to="/register">Register</Link>
//      <Link to="/login">Login</Link>
//      <Link to="/chats">Chats</Link>
//    </nav>
//  );
//}

import { NavLink } from "react-router-dom";

export default function Nav({ loggedInUserId }) {
  return (
    <nav>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Home
      </NavLink>
      <NavLink
        to="/recipes"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Recipes
      </NavLink>
      {loggedInUserId ? (
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Profile
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Login
        </NavLink>
      )}
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Register
      </NavLink>
      <NavLink
        to="/chats"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Chats
      </NavLink>
    </nav>
  );
}
