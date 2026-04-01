var allRecipes = [];
var showingFavorites = false;

function getFavorites() {
  var data = localStorage.getItem("recipeFavorites");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

function saveFavorites(favoritesArray) {
  var stringData = JSON.stringify(favoritesArray);
  localStorage.setItem("recipeFavorites", stringData);
}

function isFavorite(id) {
  var favorites = getFavorites();
  
  var found = favorites.find(function(favId) {
    return favId === id;
  });
  
  if (found !== undefined) {
    return true;
  } else {
    return false;
  }
}

function toggleFavorite(id) {
  var favorites = getFavorites();
  
  if (isFavorite(id)) {
    var newFavorites = favorites.filter(function(favId) {
      return favId !== id;
    });
    saveFavorites(newFavorites);
  } else {
    var newFavorites = [...favorites, id];
    saveFavorites(newFavorites);
  }
}

function applyClientFilters(recipes) {
  var searchInput = document.getElementById("search-input").value;
  var keyword = searchInput.trim().toLowerCase();
  
  var sortSelect = document.getElementById("sort-select").value;

  var result = recipes.filter(function(recipe) {
    var recipeTitle = recipe.title.toLowerCase();
    return recipeTitle.includes(keyword);
  });

  if (sortSelect === "az") {
    result.sort(function(a, b) {
      return a.title.localeCompare(b.title);
    });
  } else if (sortSelect === "za") {
    result.sort(function(a, b) {
      return b.title.localeCompare(a.title);
    });
  } else if (sortSelect === "time-asc") {
    result.sort(function(a, b) {
      var timeA = a.readyInMinutes || 0;
      var timeB = b.readyInMinutes || 0;
      return timeA - timeB;
    });
  } else if (sortSelect === "time-desc") {
    result.sort(function(a, b) {
      var timeA = a.readyInMinutes || 0;
      var timeB = b.readyInMinutes || 0;
      return timeB - timeA;
    });
  }

  return result;
}

function performSearch() {
  var query = document.getElementById("search-input").value.trim();
  var diet = document.getElementById("filter-diet").value;
  var cuisine = document.getElementById("filter-cuisine").value;

  showingFavorites = false;
  document.getElementById("favorites-btn").classList.remove("active");

  showLoader();

  searchRecipes(
    query, 
    diet, 
    cuisine,
    function(recipes) {
      allRecipes = recipes;
      hideLoader();
      
      var filteredRecipes = applyClientFilters(allRecipes);
      var currentFavorites = getFavorites();
      renderRecipes(filteredRecipes, currentFavorites);
    },
    function(error) {
      hideLoader();
      showMessage("⚠️ Something went wrong. " + error.message);
    }
  );
}

function toggleFavoritesView() {
  if (showingFavorites === false) {
    showingFavorites = true;
    document.getElementById("favorites-btn").classList.add("active");
    
    var favIds = getFavorites();
    
    var favRecipes = allRecipes.filter(function(recipe) {
      var found = favIds.find(function(id) {
        return id === recipe.id;
      });
      return found !== undefined;
    });

    if (favRecipes.length === 0) {
      document.getElementById("recipe-grid").innerHTML = "";
      showMessage("You haven't saved any favorites yet!");
    } else {
      renderRecipes(favRecipes, favIds);
    }
    
  } else {
    showingFavorites = false;
    document.getElementById("favorites-btn").classList.remove("active");
    
    var filteredRecipes = applyClientFilters(allRecipes);
    var currentFavorites = getFavorites();
    renderRecipes(filteredRecipes, currentFavorites);
  }
}

var searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", performSearch);

var searchInput = document.getElementById("search-input");
searchInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    performSearch();
  }
});

var sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", function() {
  if (showingFavorites === false) {
    var filteredRecipes = applyClientFilters(allRecipes);
    var currentFavorites = getFavorites();
    renderRecipes(filteredRecipes, currentFavorites);
  }
});

var dietFilter = document.getElementById("filter-diet");
dietFilter.addEventListener("change", performSearch);

var cuisineFilter = document.getElementById("filter-cuisine");
cuisineFilter.addEventListener("change", performSearch);

var favBtn = document.getElementById("favorites-btn");
favBtn.addEventListener("click", toggleFavoritesView);

var grid = document.getElementById("recipe-grid");
grid.addEventListener("click", function(event) {
  var buttonClicked = event.target.closest(".fav-btn");
  
  if (!buttonClicked) {
    return;
  }

  var stringId = buttonClicked.getAttribute("data-id");
  var recipeId = Number(stringId);

  toggleFavorite(recipeId);

  if (showingFavorites === true) {
    var favIds = getFavorites();
    var favRecipes = allRecipes.filter(function(recipe) {
      var found = favIds.find(function(id) {
        return id === recipe.id;
      });
      return found !== undefined;
    });
    
    if (favRecipes.length === 0) {
      document.getElementById("recipe-grid").innerHTML = "";
      showMessage("You haven't saved any favorites yet!");
    } else {
      renderRecipes(favRecipes, favIds);
    }
  } else {
    var filteredRecipes = applyClientFilters(allRecipes);
    var currentFavorites = getFavorites();
    renderRecipes(filteredRecipes, currentFavorites);
  }
});

performSearch();
