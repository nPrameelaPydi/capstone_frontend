export default function Recipe({ recipe, onDelete, onEdit }) {
  console.log(recipe);
  return (
    <div className="recipe-card">
      {/* Left Side: Recipe Details */}
      <div className="recipe-details">
        <h2>{recipe.title}</h2>
        <p>
          <span className="highlight">Ingredients:</span>{" "}
          {recipe.ingredients.join(", ")}
        </p>
        <p>
          <span className="highlight">Instructions:</span> {recipe.instructions}
        </p>
        <p>
          <span className="highlight">Created By:</span>{" "}
          {recipe.createdBy.name || "Unknown"}
        </p>
        <p>
          <span className="highlight">Created At:</span>{" "}
          {new Date(recipe.createdAt).toLocaleString()}
        </p>
        {/* Action Buttons */}
        <div className="recipe-actions">
          <button className="edit-button" onClick={() => onEdit(recipe)}>
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => onDelete(recipe._id)}
          >
            Delete Recipe
          </button>
        </div>
      </div>

      {/* Right Side: Recipe Image */}
      <div className="recipe-image">
        {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      </div>
    </div>
  );
}

//return (
//  <div className="recipe-card">
//    <h2>{recipe.title}</h2>
//    <p>{recipe.ingredients.join(", ")}</p>
//    <p>{recipe.instructions}</p>
//    <p>Created by: {recipe.createdBy.name || "Unknown"}</p>{" "}
//    {/* Display the user's name */}
//    <p>Created at: {new Date(recipe.createdAt).toLocaleString()}</p>
//    {/* Display the image if it exists */}
//    {recipe.image && (
//      <img
//        style={{
//          width: "300px",
//          height: "200px",
//        }}
//        src={recipe.image}
//        alt={recipe.title}
//      />
//    )}
//    <button onClick={() => onEdit()}>Edit</button> {/* Edit button */}
//    <button onClick={() => onDelete(recipe._id)}>Delete Recipe</button>{" "}
//    {/* Delete button */}
//  </div>
//);
