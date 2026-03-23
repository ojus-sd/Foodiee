# Recipe Finder 🍳

This is a straightforward, beginner-friendly web app I built to help find recipes on the fly. It hooks into the **Spoonacular API** so you can search through thousands of dishes, filter them by diet or cuisine, and save your favorites for later.

---

## What’s inside?

I wanted this to be more than just a search bar, so I packed in a few extra features:

* **Smart Search:** Find recipes by keyword (e.g., "spicy chicken" or "pesto").
* **Detailed Filtering:** Narrow things down by Diet (Vegetarian, Keto, etc.) or Cuisine (Italian, Mexican, and more).
* **Quick Sorting:** Organize results by cooking time or alphabetically.
* **Local Favorites:** I used `localStorage` to save recipes, so your "must-cook" list stays there even if you refresh the page.
* **Smooth UI:** Includes a loading spinner (because slow APIs happen) and clean error messages if something goes sideways.

---

## The Tech Stack

I kept this project "Vanilla" to focus on core JavaScript skills:
* **HTML5 & CSS3:** Used Grid and Flexbox for a responsive layout that doesn't break on mobile.
* **Vanilla JS (ES6+):** No frameworks here. Just clean modules, `async/await`, and the Fetch API.
* **Spoonacular API:** Our data source for all things food.

---

## 📁 Project Structure

text
recipe-finder/
├── index.html          
├── css/style.css       # Custom styles
└── js/
    ├── api.js          # All the fetch logic
    ├── ui.js           # Handles DOM rendering & loaders
    └── script.js       # Main event listeners & app logic

## 🚀 Setup Instructions

### 1. Get a Spoonacular API Key

1. Go to [spoonacular.com/food-api/console#Dashboard](https://spoonacular.com/food-api/console#Dashboard)
2. Sign up for a **free** account
3. Copy your **API key** from the dashboard

### 2. Add Your API Key

Open **js/api.js** and replace the placeholder:

js
const API_KEY = "YOUR_API_KEY_HERE";   // ← paste your key here


### 3. Run the App

No build tools required — just open `index.html` in any modern browser:

bash
open index.html

start index.html

## 📝 Code Highlights

- **No `for` / `while` loops** – All iteration uses higher-order array methods (`map`, `filter`, `sort`, `find`).
- **Modular JS** – Concerns are separated across three files: API, UI, and main logic.
- **Well-commented** – Every function includes a JSDoc comment explaining its purpose and parameters.

---

## 📜 License

This project is open-source and available for educational purposes. Feel free to modify and share! -->
