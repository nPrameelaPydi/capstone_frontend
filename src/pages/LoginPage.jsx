import { useState } from "react";
import axios from "axios";

const Login = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //send post req to backend with formData email and password
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      //optional chaining ensures that if response or data is null or undefined, it won’t throw an error and will return undefined instead
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
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
            Forgot your password? <a href="/forgot-password">Reset it here</a>
          </p>
        </div>
      </form>
      {/* render msg if exists */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
