import { useState, useEffect } from "react";
import axios from "axios";

export default function CommunityCorner() {
  //store meals from api
  const [meals, setMeals] = useState([]);
  //store error msg
  const [error, setError] = useState("");

  //make an api reuest to fetch random meal data
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => {
        setMeals(response.data.meals);
      })
      .catch((err) => {
        //if error occurs while fetching data
        setError("Failed to fetch data from Meal API");
      });
  }, []); //runs only once when the page mounts

  return (
    <div className="community-container">
      <div className="community-center">
        <h1>Community Center</h1>

        {/* Explanation about fetching new recipes */}
        <p>
          Welcome to the Community Center! Here, you'll find a random selection
          of recipes. Each time you visit, we fetch a different meal suggestion
          from the Meal API. Check out the details, and get inspired to try a
          new recipe!
        </p>

        {/* Display error if any */}
        {error && <p>{error}</p>}

        {/* Display fetched meals if they exist */}
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <h2>{meal.strMeal}</h2>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strInstructions.substring(0, 100)}...</p>
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                Recipe Source
              </a>
            </div>
          ))
        ) : (
          <p>No meals found.</p>
        )}

        {/* Highlight Meal API link */}
        <p>
          <a
            href="https://www.themealdb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="meal-api-link"
          >
            Check out more recipes from Meal API
          </a>
        </p>

        <div className="text-container">
          <h2>Why Explore New Recipes?</h2>
          <p>
            Discovering new recipes and meal ideas is not just about food. It's
            about sharing experiences, learning new cultures, and making
            memories. In this community space, you can explore different meal
            options, share your own favorite recipes, and connect with others
            who love food. Let's create a space to celebrate the joy of cooking!
          </p>
        </div>
      </div>
    </div>
  );
}
