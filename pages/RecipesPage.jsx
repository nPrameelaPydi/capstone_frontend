import { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "../components/Recipe.jsx";

export default function RecipePage() {
  // State to hold the list of recipes fetched from the server
  const [recipes, setRecipes] = useState([]);

  // State to hold the new recipe data entered by the user in the form
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    createdBy: "", // User ID or username provided by the user
  });

  // Handle input changes in the form and update the corresponding field in the newRecipe state
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get the name of the field and its value
    setNewRecipe((prevState) => ({
      ...prevState, // Preserve the existing fields
      [name]: value, // Update the specific field
    }));
  };

  // Handle form submission to send a POST request to the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
      const response = await axios.post(
        "http://localhost:3000/api/recipes", // Backend API endpoint for creating a recipe
        newRecipe // Send the newRecipe object as the request body
      );

      // Add the newly created recipe to the recipes state
      setRecipes((prevRecipes) => [...prevRecipes, response.data]);

      // Reset the form fields
      setNewRecipe({
        title: "",
        ingredients: "",
        instructions: "",
        createdBy: "",
      });
    } catch (error) {
      console.error("Error creating recipe:", error); // Log any error that occurs
    }
  };

  // Fetch recipes from the backend when the component is first rendered
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/recipes") // Backend API endpoint for fetching recipes
      .then((response) => {
        setRecipes(response.data); // Store the fetched recipes in the state
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error); // Log any error that occurs
      });
  }, []); // Empty dependency array ensures this runs only once, on mount

  // Handle recipe deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/recipes/${id}`); // Backend DELETE route
      // Update the state to remove the deleted recipe
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== id)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <main>
      <h1>Recipe Page</h1>
      {/* Form for adding a new recipe */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newRecipe.title}
          onChange={handleInputChange}
          placeholder="Title" // Input for recipe title
        />
        <input
          type="text"
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          placeholder="Ingredients (comma separated)" // Input for recipe ingredients
        />
        <textarea
          name="instructions"
          value={newRecipe.instructions}
          onChange={handleInputChange}
          placeholder="Instructions" // Input for recipe instructions
        />
        <input
          type="text"
          name="createdBy"
          value={newRecipe.createdBy}
          onChange={handleInputChange}
          placeholder="Created By (user ID)" // Input for user ID
        />
        <button type="submit">Add Recipe</button>
      </form>

      {/* Display the list of recipes */}
      <div>
        {recipes.map((recipe) => (
          <Recipe key={recipe._id} recipe={recipe} onDelete={handleDelete} />
        ))}
      </div>
    </main>
  );
}
