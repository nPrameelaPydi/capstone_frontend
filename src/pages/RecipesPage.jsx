import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Recipe from "../components/Recipe.jsx";
import { useParams } from "react-router-dom";

export default function RecipePage() {
  // State to hold the list of recipes fetched from the server
  const [recipes, setRecipes] = useState([]);

  // State to hold the new recipe data entered by the user in the form
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    createdBy: "", // User ID or username provided by the user
    image: "",
  });
  // State to track the recipe being edited
  const [editingRecipe, setEditingRecipe] = useState(null);
  // State for the uploaded image
  const [image, setImage] = useState(null);

  const titleInputRef = useRef(null);

  const { recipeId } = useParams(); // Get the recipeId from the URL

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

  useEffect(() => {
    if (recipeId) {
      // Fetch the recipe by ID when the page loads
      axios
        .get(`http://localhost:3000/api/recipes/${recipeId}`)
        .then((response) => {
          setEditingRecipe(response.data); // Load recipe into editingRecipe
          setNewRecipe({
            title: response.data.title,
            ingredients: response.data.ingredients,
            instructions: response.data.instructions,
            createdBy: response.data.createdBy,
            image: response.data.image || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching recipe for editing:", error);
        });
    }
  }, [recipeId]); // Runs whenever recipeId changes

  // Handle input changes in the form and update the corresponding field in the newRecipe state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onInputChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission to send a POST request to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const imageResponse = await axios.post(
          "http://localhost:3000/api/recipes/upload-image",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // If the image is successfully uploaded, assign the imageUrl
        imageUrl = imageResponse.data.imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Update newRecipe with the image URL if available
    const recipeData = {
      ...newRecipe,
      image: imageUrl,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/recipes", // Backend API endpoint for creating a recipe
        recipeData, // Send the newRecipe object as the request body
        { headers: { "Content-Type": "application/json" } }
      );

      // Add the newly created recipe to the recipes state
      setRecipes((prevRecipes) => [...prevRecipes, response.data]);

      // Reset the form fields
      setNewRecipe({
        title: "",
        ingredients: "",
        instructions: "",
        createdBy: "",
        image: "",
      });
    } catch (error) {
      console.error("Error creating recipe:", error); // Log any error that occurs
    }
  };

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

  // Handle editing: When "Edit" button is clicked, set the recipe to edit
  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setNewRecipe({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      createdBy: recipe.createdBy._id || recipe.createdBy,
      image: recipe.image || "", //set an empty string if img not available
    });
    titleInputRef.current.focus();
  };

  // Handle recipe update via PATCH request
  const handleUpdate = async (e) => {
    e.preventDefault();

    let imageUrl = editingRecipe.image; // Keep existing image if no new one is uploaded

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      console.log("FormData contents:", [...formData.entries()]);

      try {
        const imageResponse = await axios.post(
          "http://localhost:3000/api/recipes/upload-image",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        imageUrl = imageResponse.data.imageUrl;
      } catch (error) {
        console.error("Error uploading image while editing recipe:", error);
      }
    }

    //prepare updated recipe data
    const updatedRecipe = {
      ...newRecipe,
      image: imageUrl, //include updated or existing image URL
    };

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/recipes/${editingRecipe._id}`,
        updatedRecipe,
        { headers: { "Content-Type": "application/json" } }
      );

      // Update the recipes state with the updated recipe
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === editingRecipe._id ? response.data : recipe
        )
      );

      //reset the form fields
      setEditingRecipe(null); // Close the edit form
      setNewRecipe({
        title: "",
        ingredients: "",
        instructions: "",
        createdBy: "",
        image: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <main className="rpmain">
      <h1 className="recipePageTitle">Recipe Page</h1>
      {/* Form for adding a new recipe */}
      <form
        className="recipePageForm"
        onSubmit={editingRecipe ? handleUpdate : handleSubmit}
      >
        <input
          ref={titleInputRef}
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
        <input
          type="file"
          accept="image/*"
          onChange={onInputChangeImage} // Handle image upload
        />
        <button type="submit">
          {editingRecipe ? "Update Recipe" : "Add Recipe"}
        </button>
        {editingRecipe && (
          <button
            type="button"
            onClick={() => {
              setEditingRecipe(null);
              setNewRecipe({
                title: "",
                ingredients: "",
                instructions: "",
                createdBy: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Display the list of recipes */}
      <div className="recipe-list-container">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
            onEdit={() => handleEdit(recipe)}
          />
        ))}
      </div>
    </main>
  );
}
