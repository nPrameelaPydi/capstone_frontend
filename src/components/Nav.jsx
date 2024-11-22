import { Link } from "react-router-dom";

export default function Nav({ loggedInUserId }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/recipes">Recipes</Link>

      {loggedInUserId ? <Link to="/profile"></Link> : <Link to="/login"></Link>}

      <Link to="/profile">Profile</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/chats">Chats</Link>
    </nav>
  );
}
