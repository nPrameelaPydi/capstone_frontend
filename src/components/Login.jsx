import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setLoggedInUserId }) => {
  //state to hold email and password entered by the user
  const [formData, setFormData] = useState({
    email: "", //initial value
    password: "",
  });

  //state to hold the success or error message display to user
  const [message, setMessage] = useState("");

  //whenever user types in the input field, uses input name to determine which field to update
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //useNavigate hook is used to access the navigate function, which allows you to programmatically navigate to different routes in the application
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response data:", response.data);

      const { userId, name, message } = response.data || {};

      if (!userId || !name) {
        throw new Error("Invalid server response");
      }

      // Save user data to localStorage
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", name);

      // Update global user state
      setLoggedInUserId(userId);

      // navigate("/profile") to navigate to the profile page after a successful login
      navigate("/profile");

      // Display success message
      setMessage(message || "Login successful");
    } catch (error) {
      console.error("Error logging in:", error); // Log error in detail
      const errorMessage = error.response
        ? error.response.data.message
        : "Login failed";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} action="">
          <div>
            {/* email input */}
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            {/* Password input */}
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* submit button to trigger login route */}
          <button type="submit">Login</button>
          {/* forgot password link */}
          <div>
            <p>
              Forgot your password?{" "}
              <a href="/forgot-password" style={{ color: "blue" }}>
                <br />
                <br />
                Reset it here
              </a>
            </p>
          </div>
        </form>
        {/* render msg if exists */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
