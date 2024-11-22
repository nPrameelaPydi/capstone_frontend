export default function Recipe({ recipe, onDelete, onEdit }) {
  console.log(recipe);
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.ingredients.join(", ")}</p>
      <p>{recipe.instructions}</p>
      <p>Created by: {recipe.createdBy.name || "Unknown"}</p>{" "}
      {/* Display the user's name */}
      <p>Created at: {new Date(recipe.createdAt).toLocaleString()}</p>
      <button onClick={() => onEdit()}>Edit</button> {/* Edit button */}
      <button onClick={() => onDelete(recipe._id)}>Delete Recipe</button>{" "}
      {/* Delete button */}
    </div>
  );
}
