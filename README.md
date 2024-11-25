# Food & Friends (Frontend)

The **Food & Friends** is a dynamic, user-friendly React-based web application designed for sharing and exploring recipes, fostering a vibrant community of food enthusiasts . It allows users to explore, create, and manage recipes. It connects to the backend API to handle authentication, recipe management, and image uploads.

## Features

- User authentication (login and registration)
- Display a list of all recipes as clickable cards
- View, create, update, and delete recipes
- Upload and update recipe images
- Search recipes by title or ingredients
- Community Corner: Discussions, highlights, and trending content

## **Tech Stack**

- **Frontend Framework**: React.js
- **Routing**: React Router DOM
- **HTTP Requests**: Axios
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: CSS/Bootstrap/Tailwind (as applicable)
- **Image Upload**: Form data integration

## **Getting Started**

### **Prerequisites**

- Node.js and npm installed.
- Backend API running for full functionality.

### **Installation**

1. Clone the repository:
   ```bash
   git clone git@github.com:nPrameelaPydi/capstone_frontend.git
   cd food-and-friends-frontend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the developmemt server
   ```bash
   npm run dev
   ```
4. Open browser at
   ```bash
   http://localhost:5173
   ```

## **Folder Structure**

```plaintext
src/
├── components/
│   ├── Nav.jsx
├── ├── SearchBar.jsx
│   ├── Recipe.jsx
│   ├── Footer.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegistrationPage.jsx
│   ├── RecipePage.jsx
│   ├── NotFoundPage.jsx
│   ├── UserPage.jsx
│   ├── CommunityCornerPage.jsx
├── App.jsx
├── index.js
```

## API Endpoints

The frontend interacts with the following backend API endpoints:

- User Routes:

```
POST /api/users/register: Register a new user.
POST /api/users/login: Login for existing users.
```

- Recipe Routes:

```
GET /api/recipes: Fetch all recipes.
POST /api/recipes: Create a new recipe.
PATCH /api/recipes/:id: Update a specific recipe.
DELETE /api/recipes/:id: Delete a specific recipe.
POST /api/recipes/upload-image: Upload an image for a recipe.
```

## **Approach Taken**

### **Frontend Development**

1. **Component Design**: Created reusable components like `Nav`, `SearchBar`, `RecipeCard`, and `Footer` to simplify the UI structure.
2. **Responsive Design**: Ensured mobile-first design with flexibility for different screen sizes.
3. **Dynamic Data Handling**: Implemented state management to reflect real-time updates in the app, like adding or editing recipes.
4. **Image Upload Integration**: Integrated image handling with `multipart/form-data` to enable users to upload pictures for their recipes.
5. **Error Handling**: Added console logging and conditional rendering for a smooth user experience during API failures.

---

## **Unsolved Problems**

1. **User Authentication**: Currently, the app allows free access to all features. A future goal is to integrate secure login and user-specific recipe management.
2. **Advanced Image Handling**: Implementing image resizing or compression for optimized storage is pending.
3. **Community Interactions**: The "Community Corner" is in development and will include dynamic user-to-user interactions, such as upvotes and replies.

## **Acknowledgments**

- **React**  
  A JavaScript library for building user interfaces.  
  [React Documentation](https://reactjs.org/docs/getting-started.html)
- **TheMealDB API**  
  Free Recipe API Support  
  [Documentation](https://www.themealdb.com/api.php)
