import { useState } from "react";
import axios from "axios";

const Register = () => {
  // useState hook to manage the form data and the response message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // To show success/error message after submitting the form
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    // update form data object with changed value
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //make a POST request to the backend to register the user
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );
      console.log(response.data); // Log success response
      setMessage(response.data.message); //set success msg
    } catch (error) {
      console.error(error.response?.data || error.message);
      //error.response?.data?.message: The ?. is called optional chaining. It ensures that if response or data is null or undefined, it won’t throw an error and will return undefined instead. This makes it safer to access properties that might not exist if something goes wrong with the request.
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div>
      <h2>Register</h2>
      {/* the form where users input their data */}
      <form onSubmit={handleSubmit} action="">
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <button type="submit">Register</button>
      </form>
      {/* display the message if it's not an empty string */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
