# Movie App

A web application that allows users to search their favourite movies and watch which are the trending movies based on the users' searches. The application is an implementation of the React library strictly for the Frontend and uses different components like movie cards, a search bar and a spinner for the loading state. 

## 🛠Technologies Used

- **Frontend:** React + VITE, TailwindCSS, JavaScript, JSX
- **Database:** Appwrite
## Installation & Setup

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/FlorinDLF/Movie-App.git

2. **Frontend Setup (React):**


  Navigate to the frontend folder and install dependencies:
  
    npm install
    npm install react-use
    npm install tailwindcss @tailwindcss/vite

  Add the @tailwindcss/vite plugin to your Vite configuration:

    import { defineConfig } from 'vite'
    import tailwindcss from '@tailwindcss/vite'

    export default defineConfig({
      plugins: [
        tailwindcss(),
      ],
    })
  Run the development server:
    
    npm run dev

3. **Backend Setup:**

  **Database for metrics**
  
  Install required package for Appwrite:

    npm install appwrite
Setup account and database in [Appwrite](https://appwrite.io/):

- Create Account
- Create a new Web project called Movie_App
- Create a new database
- Create a new collection
- Create columns that match the ones in the picture
  <img width="534" height="199" alt="image" src="https://github.com/user-attachments/assets/bb78c8b9-7303-40ee-8740-28b9619b4b35" />
- Modify the .env.local file with the IDs that match your database, collection, project and name

  **Database for movies**
  
Setup account in [TMDB](https://www.themoviedb.org/):

- Create Account
- Look for API Documentation
- Look for API Reference
- Jump To movie in the DISCOVER section
- Modify the .env.local file with the token that matches your account
