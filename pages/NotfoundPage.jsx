import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main>
      <h1>Page Not Found</h1>
      <Link to="/">Go back Home</Link>
    </main>
  );
}
