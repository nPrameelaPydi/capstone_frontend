import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleRecipePage() {
  // State to hold the details of the specific recipe being viewed/edited
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { id } = useParams(); // Get the recipe ID from the URL

  useEffect(() => {
    const fetchRecipeById = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/${id}`
        );
        setRecipeDetails(response.data); // Store the specific recipe details
      } catch (error) {
        console.error("Error fetching recipe with specified id", error);
      }
    };
    fetchRecipeById();
  }, [id]); //rerun the effect when id changes

  return (
    <div className="single-recipe-page">
      <div className="recipe-view">
        {recipeDetails && (
          <div>
            <h2>{recipeDetails.title}</h2>
            <p>{recipeDetails.ingredients}</p>
            <p>{recipeDetails.instructions}</p>
            <p className="created-by">Created by: {recipeDetails.createdBy}</p>
            {recipeDetails.image && (
              <img
                className="single-recipe-img"
                src={recipeDetails.image}
                alt="Recipe"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
