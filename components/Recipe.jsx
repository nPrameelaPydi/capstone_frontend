export default function Recipe({ recipe, onDelete, onEdit }) {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.ingredients.join(", ")}</p>
      <p>{recipe.instructions}</p>
      <p>Created by: {recipe.createdBy}</p>
      <p>Created at: {new Date(recipe.createdAt).toLocaleString()}</p>
      <button onClick={() => onEdit()}>Edit</button> {/* Edit button */}
      {/* Delete button */}
      <button onClick={() => onDelete(recipe._id)}>Delete Recipe</button>
    </div>
  );
}
