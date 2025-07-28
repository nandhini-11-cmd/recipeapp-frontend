            
                                  Recipe Sharing Platform

A full-featured recipe sharing platform built with the MERN stack where users can explore, share, rate, and manage their favorite recipes, plan meals, generate shopping lists, and follow other cooks.

Tech Stack:

Frontend: React, Tailwind CSS, Axios, React Router DOM, Formik, React Player

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT Auth

Dev Tools: Postman,GitHub

Features:

 Recipe Features:

 Create, Read, Update, Delete recipes

 Upload photo and video tutorial links

 Search by keywords(title,incredients), Filter by cuisine and diet.
 
 User Features:

 Register & Login with JWT authentication

 View your own recipes
 
 Add recipes to favorites

 Follow / Unfollow other users

 Adittional Features:

 Rate recipes (1 to 5 stars)

 Comment on recipes

 Meal Planning:

 Add recipes to weekly meal planner

 Edit / delete meals by date

 Generate a consolidated shopping list from meal plans as per the incredients.

 API Endpoints:

Method	          Endpoint	                  Description

POST	       /api/users/register	         Register a new user

POST	       /api/users/login	             Login user

GET	           /api/recipes	                 Fetch all recipes

POST	       /api/recipes	                 Create a recipe

PUT	           /api/recipes/:id	             Update a recipe

DELETE	       /api/recipes/:id	             Delete a recipe

POST	       /api/recipes/:id/rate	     Rate a recipe

POST	       /api/recipes/:id/comment	     Add comment to recipe

POST	       /api/users/:id/favorite	     Add to favorites

GET	           /api/users/favorites	         Get favorite recipes

POST	       /api/users/follow/:id	     Follow a user

GET	           /api/users/following	         Get followed users

POST	       /api/mealplans	             Create meal plan

PUT	           /api/mealplans	             Update meal plan

GET	           /api/mealplans	             Get all plans

DELETE	       /api/mealplans	             Delete plan by date

GET	           /api/mealplans/shopping-list	 Get shopping list