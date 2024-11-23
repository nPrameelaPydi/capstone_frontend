import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import RecipeList from "../components/RecipeList.jsx";
import axios from "axios";

export default function HomePage() {
  //state to hold list of recipes
  const [recipes, setRecipes] = useState([]);
  //state to handle errors
  const [error, setError] = useState("");

  //Fetch all recipes on initialload of Homepage
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/recipes"); //axios GET request
        setRecipes(response.data); //update recipes state with response data
      } catch (error) {
        console.error("Error fetching recipes", error);
        setError("Failed to fetch recipes");
      }
    };
    fetchAllRecipes();
  }, []);

  //update the recipes state when search results are received
  const handleSearchResults = (recipeList) => {
    setRecipes(recipeList);
  };

  return (
    <div>
      <h1>Welcome to Food & Friends</h1>
      <SearchBar onSearch={handleSearchResults}></SearchBar>
      <RecipeList recipes={recipes}></RecipeList>
      {/* display error msgs if any */}
      {error && <p>{error}</p>}
    </div>
  );
}
