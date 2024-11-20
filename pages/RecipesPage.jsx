import { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "../components/Recipe.jsx";

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    createdBy: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/recipes",
        newRecipe
      );

      // Update the recipes state with the newly created recipe
      setRecipes((prevRecipes) => [...prevRecipes, response.data]);
      setNewRecipe({
        title: "",
        ingredients: "",
        instructions: "",
        createdBy: "",
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  // Fetch recipes when the component is mounted
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/recipes") // Adjust URL based on your backend
      .then((response) => {
        setRecipes(response.data); // Set the state with the received data
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <main>
      <h1>Recipe Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newRecipe.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          placeholder="Ingredients (comma separated)"
        />
        <textarea
          name="instructions"
          value={newRecipe.instructions}
          onChange={handleInputChange}
          placeholder="Instructions"
        />
        <input
          type="text"
          name="createdBy"
          value={newRecipe.createdBy}
          onChange={handleInputChange}
          placeholder="Created By (user ID)"
        />
        <button type="submit">Add Recipe</button>
      </form>

      <div>
        {recipes.map((recipe) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
