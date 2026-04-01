
const recipeGrid = document.getElementById("recipe-grid");
const loaderEl   = document.getElementById("loader");
const messageEl  = document.getElementById("message");



function showLoader() {
  loaderEl.hidden  = false;
  messageEl.hidden = true;
  recipeGrid.innerHTML = "";
}

function hideLoader() {
  loaderEl.hidden = true;
}

function showMessage(text) {
  messageEl.textContent = text;
  messageEl.hidden = false;
}

function hideMessage() {
  messageEl.hidden = true;
}

function createRecipeCard(recipe, favorites) {
  const card = document.createElement("article");
  card.classList.add("recipe-card");

  const isFav = favorites.find(function (id) {
    return id === recipe.id;
  });

  const title   = recipe.title;
  const image   = recipe.image || "https://via.placeholder.com/400x200?text=No+Image";
  const time    = recipe.readyInMinutes || "N/A";
  const servings = recipe.servings || "–";
  const diets = recipe.diets || [];
  const tagsHTML = diets
    .map(function (diet) {
      return '<span class="tag">' + diet + "</span>";
    })
    .join("");

  card.innerHTML =
    '<img src="' + image + '" alt="' + title + '" loading="lazy" />' +
    '<div class="recipe-card__body">' +
      '<h2 class="recipe-card__title">' + title + "</h2>" +
      '<div class="recipe-card__meta">' +
        "<span>⏱ " + time + " min</span>" +
        "<span>👤 " + servings + " servings</span>" +
      "</div>" +
      '<div class="recipe-card__tags">' + tagsHTML + "</div>" +
      '<button class="fav-btn ' + (isFav ? "is-fav" : "") + '" ' +
        'data-id="' + recipe.id + '" aria-label="Toggle favorite">' +
        (isFav ? "♥ Saved" : "♡ Favorite") +
      "</button>" +
    "</div>";

  return card;
}


function renderRecipes(recipes, favorites) {
  recipeGrid.innerHTML = "";

  if (recipes.length === 0) {
    showMessage("No recipes found. Try a different search!");
    return;
  }

  hideMessage();

  recipes.forEach(function (recipe) {
    const card = createRecipeCard(recipe, favorites);
    recipeGrid.appendChild(card);
  });
}
