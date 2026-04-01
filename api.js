
const API_KEY = "b427c0500c4d4a68a2e694d2b353d7e1";

const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

function searchRecipes(query, diet, cuisine, onSuccess, onError) {
  var url = BASE_URL
    + "?apiKey=" + API_KEY
    + "&query=" + (query || "")
    + "&number=30"
    + "&addRecipeInformation=true";

  if (diet)    url = url + "&diet=" + diet;
  if (cuisine) url = url + "&cuisine=" + cuisine;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("API request failed (status " + response.status + ")");
      }
      return response.json();
    })
    .then(function (data) {
      const results = data.results || [];
      onSuccess(results);
    })
    .catch(function (error) {
      onError(error);
    });
}
