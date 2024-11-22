import { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfile({ userId }) {
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

  // JSX to render the user profile and their recipes
  return (
    <div>
      {/* display user info only if user data is loaded */}
      {user && (
        <div>
          <h1>{user.name}'s Profile</h1>
          <p>Email: {user.email}</p>
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
                {/* button to delete recipe */}
                <button>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
