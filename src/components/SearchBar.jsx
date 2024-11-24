import { useState } from "react";
import axios from "axios";

export default function SearchBar({ onSearch }) {
  //useState hook to hold title
  const [title, setTitle] = useState("");

  //Handle input change
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  //Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    //check if title is empty
    if (!title) {
      return alert("Please enter a recipe title to search");
    }

    try {
      //make get req to backend /search route
      const response = await axios.get(
        `http://localhost:3000/api/recipes/search?title=${title}`
      );

      console.log(response);

      //onSearch(response.data); is calls a function that was passed as a prop to the SearchBar component from its parent component (here HomePage).
      //This function (onSearch) is used to pass the search results back to the parent so that the parent can update its state with the new results.
      onSearch(response.data);
    } catch (err) {
      console.log(err);
      console.error("Error searching recipes:", err);
    }
  };

  return (
    <form className="searchbar" onSubmit={handleSearch} action="">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="Search by recipe title..."
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}
