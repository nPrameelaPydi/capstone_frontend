import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import RecipeList from "../components/RecipeList.jsx";

export default function HomePage() {
  //state to hold list of recipes
  const [recipes, setRecipes] = useState([]);

  //update the recipes state when search results are received
  const handleSearchResults = (recipeList) => {
    setRecipes(recipeList);
  };

  return (
    <div>
      <h1>Welcome to Food & Friends</h1>
      <SearchBar onSearch={handleSearchResults}></SearchBar>
      <RecipeList recipes={recipes}></RecipeList>
    </div>
  );
}
