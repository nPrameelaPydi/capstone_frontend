export default function RecipeList({ recipes, onRecipeClick }) {
  // Ensure recipes is an array
  //  recipes = Array.isArray(recipes) ? recipes : [];
  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id} onClick={() => onRecipeClick(recipe._id)}>
              <h3>{recipe.title}</h3>
              {recipe.image && <img src={recipe.image} alt={recipe.title} />}
              <p>{recipe.ingredients.join(", ")}</p>
              <p>{recipe.instructions}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
