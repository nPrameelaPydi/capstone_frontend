import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ userId }) {
  const navigate = useNavigate();

  //state hook to store user info
  const [user, setUser] = useState(null);
  //state to store recipes created by user
  const [recipes, setRecipes] = useState([]);

  //useEffect to fetch user and their recipes
  useEffect(() => {
    //make a call to backend api, set userdata, recipes data into corresponding useStates,
    axios
      .get(`http://localhost:3000/api/users/${userId}/profile`)
      .then((response) => {
        setUser(response.data.user);
        setRecipes(response.data.recipes);
      })
      .catch((error) => {
        console.error("Error fetching user Profile", error);
      });
  }, [userId]); //ensures the effect runs only when `userId` changes)

  const handleEdit = (recipeId) => {
    console.log(`Navigating to /recipe/${recipeId}/edit`);
    // Navigate to the edit page for the selected recipe
    navigate(`/recipe/${recipeId}/edit`);
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

  // JSX to render the user profile and their recipes
  return (
    <div className="profile-page">
      {/* display user info only if user data is loaded */}
      {user && (
        <div className="profile-container">
          <h1>{user.name}'s Profile</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <div className="profile-recipes">
            <h2>My Recipes</h2>
            <ul>
              {/* iterate thru the recipes array and render each recipe */}
              {recipes.map((recipe) => (
                <li key={recipe._id}>
                  <h3>{recipe.title}</h3>
                  {/*<p>{JSON.stringify(recipe)}</p>*/}
                  <p>
                    <strong>Ingredients:</strong> {recipe.ingredients}
                  </p>
                  <p>
                    <strong>Instructions:</strong> {recipe.instructions}
                  </p>
                  <p>
                    <small>
                      Created on:{" "}
                      {new Date(recipe.createdAt).toLocaleDateString()}
                    </small>
                  </p>
                  {recipe.image && (
                    <img
                      className="up-recipe-img"
                      src={recipe.image}
                      alt="Recipe"
                    />
                  )}
                  {/* button to delete recipe */}
                  <button
                    className="user-profile-btn"
                    onClick={() => handleDelete(recipe._id)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(recipe._id)}
                    className="user-profile-btn"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
