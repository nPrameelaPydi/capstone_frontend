import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; {new Date().getFullYear()} Food & Friends. All rights reserved.
        </p>
        <ul className="footer-links">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
