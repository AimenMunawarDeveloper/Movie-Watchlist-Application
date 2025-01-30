const apiUrl = "http://www.omdbapi.com/?apikey=7d54cff9&type=movie";
const movies = [
  "Inception",
  "The Dark Knight",
  "Interstellar",
  "The Matrix",
  "The Godfather",
  "Pulp Fiction",
  "The Shawshank Redemption",
  "Forrest Gump",
  "The Lion King",
  "The Avengers",
];
const watchlists = JSON.parse(localStorage.getItem("watchlist")) || [];
console.log("got this in local storage", watchlists);

async function fetchMovieData(movieTitle) {
  const url = `${apiUrl}&t=${encodeURIComponent(movieTitle)}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        console.log("Fetched data:", data);
        return data;
      } else {
        console.log(`Movie not found or API error for: ${movieTitle}`);
        return null;
      }
    })
    .catch((error) => {
      console.error(`Error fetching movie data for ${movieTitle}: ${error}`);
      return null;
    });
}
function getMovieData() {
  const storedMovies =
    JSON.parse(localStorage.getItem("displayedMovies")) || [];
  storedMovies.forEach((movieData) => displayMovieList(movieData));
  const moviesToFetch = movies.filter(
    (movieTitle) => !storedMovies.some((movie) => movie.Title === movieTitle)
  );
  Promise.all(moviesToFetch.map((movie) => fetchMovieData(movie)))
    .then((movieDataArray) => {
      movieDataArray
        .filter((movieData) => movieData !== null)
        .forEach((movieData) => displayMovieList(movieData));
    })
    .catch((error) => {
      console.error("Error fetching initial movie data:", error);
    });
}
function displayMovieList(movieData) {
  const movieList = document.querySelector(".movies__list");
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");
  movieDiv.innerHTML = `
      <i class="fa fa-plus movie__icon" data-movie='${JSON.stringify(
        movieData
      ).replace(/'/g, "&apos;")}'></i>
    <img src="${movieData?.Poster}" class="movie__image"/>
    <div class="movie__text">
        <h3>${movieData?.Title}</h3>
        <h3>${movieData?.Year}</h3>
    </div>
    <div class="watchlist__dropdown" style="display:none;">
        <select class="watchlist__dropdown_select">
              <option value="Select a watchlist">Select a watchlist</option>
        </select>
    </div>
  `;
  movieList?.appendChild(movieDiv);
  const savedMovies = JSON.parse(localStorage.getItem("displayedMovies")) || [];
  if (!savedMovies.find((movie) => movie.Title === movieData.Title)) {
    savedMovies.push(movieData);
    localStorage.setItem("displayedMovies", JSON.stringify(savedMovies));
  }
  const plusIcon = movieDiv.querySelector(".movie__icon");
  plusIcon.addEventListener("click", function () {
    const movieData = JSON.parse(
      plusIcon.getAttribute("data-movie").replace(/&apos;/g, "'")
    );
    showWatchlistDropdown(event, movieData);
  });
}
function showWatchlistDropdown(event, movieData) {
  const parent = event.target.parentElement;
  const dropdown = parent.querySelector(".watchlist__dropdown");
  dropdown.style.display = "block";
  const watchlistSelect = dropdown.querySelector(".watchlist__dropdown_select");
  watchlistSelect.innerHTML = `<option value="Select a watchlist">Select a watchlist</option>`;
  watchlists.forEach((watchlist) => {
    const option = document.createElement("option");
    option.value = watchlist.name;
    option.textContent = watchlist.name;
    watchlistSelect.appendChild(option);
  });
  watchlistSelect.onchange = function () {
    const selectedWatchlist = watchlistSelect.value;
    addMovieToAWatchList(event, movieData, selectedWatchlist);
  };
}
function searchAMovie() {
  const movieTitle = document.querySelector(".main__search__Input").value;
  console.log("Searched movie:", movieTitle);
  fetchMovieData(movieTitle).then((data) => {
    if (data) {
      displayMovieList(data);
    } else {
      console.log("No data to display.");
    }
  });
  document.querySelector(".main__search__Input").value = "";
}
const searchButton = document.querySelector(".search__button");
if (searchButton) {
  searchButton.addEventListener("click", searchAMovie);
}
const mainInput = document.querySelector(".main__search__Input");
if (mainInput) {
  mainInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchAMovie();
    }
  });
}
function validateForm() {
  const watchListName = document.getElementById("watchlist__name").value;
  if (watchListName.trim() === "") {
    alert("Watchlist name is required!");
    return false;
  }
  createAWatchlist();
  document.querySelector(".create_watchlist_form").reset();
  alert("Watchlist created successfully!");
  return false;
}
function createAWatchlist() {
  const watchListName = document.getElementById("watchlist__name").value;
  const watchListDescription = document.getElementById(
    "watchlist__description"
  ).value;
  watchlists.push({
    name: watchListName,
    description: watchListDescription,
    movies: [],
  });
  localStorage.setItem("watchlist", JSON.stringify(watchlists));
  console.log(watchlists);
}
function addMovieToAWatchList(event, movieData, watchlistName = "new") {
  console.log("watchlist name", watchlistName);
  const watchlist = watchlists.find((list) => list.name === watchlistName);
  if (watchlist) {
    if (!watchlist.movies.find((movie) => movie.Title === movieData.Title)) {
      watchlist.movies.push({
        Title: movieData.Title,
        Year: movieData.Year,
        watched: false,
      });
      localStorage.setItem("watchlist", JSON.stringify(watchlists));
      alert("Movie added successfully");
      console.log("Updated watchlists", watchlists);
    } else {
      alert("Movie already in this watchlist");
    }
  } else {
    console.log("Watchlist not found");
  }
  const parent = event.target.parentElement;
  const dropdown = parent.querySelector(".watchlist__dropdown");
  dropdown.style.display = "none";
  findProgress();
}
function displayWatchlists() {
  const watchlistsEl = document.querySelector(".watchlists");
  watchlistsEl.innerHTML = "";
  watchlists.forEach((watchlist, index) => {
    const watchlistDiv = document.createElement("div");
    watchlistDiv.classList.add("watchlistItem");
    watchlistDiv.innerHTML = `
      <h2>Name: ${watchlist.name}</h2>
      <p>Description: ${watchlist.description}</p>
      <ul class="movies_in_watchlist">
        ${watchlist.movies
          .map(
            (movie, movieIndex) =>
              `<li>${movie.Title} (${movie.Year}) 
            <div class="watchlist_btns">
                            <button class="btn btn_watchlist  mark_as_watched" onclick="markAsWatched(${index}, ${movieIndex})">
                  ${movie.watched ? "Unmark as Watched" : "Mark as Watched"}
                </button>
              <button class="btn btn_watchlist remove_movie" onclick="removeMovieFromWatchlist(${index}, ${movieIndex})">Remove</button></div>
              </li>`
          )
          .join("")}
      </ul>
      <button class="btn btn_watchlist edit_watchlist" onclick="editWatchlist(${index})">Edit Watchlist</button>
      <button class="btn btn_watchlist delete_watchlist" onclick="deleteWatchlist(${index})">Delete Watchlist</button>
    `;
    watchlistsEl?.appendChild(watchlistDiv);
  });
}
function markAsWatched(watchlistIndex, movieIndex) {
  const watchlist = watchlists[watchlistIndex];
  const movie = watchlist.movies[movieIndex];
  movie.watched = !movie.watched;
  localStorage.setItem("watchlist", JSON.stringify(watchlists));
  displayWatchlists();
  alert(`Movie marked as ${movie.watched ? "watched" : "not watched"}`);
  findProgress();
}
function launchBalloons() {
  const balloonContainer = document.createElement("div");
  balloonContainer.classList.add("balloon-container");
  document.body.appendChild(balloonContainer);
  for (let i = 0; i < 20; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    balloon.style.left = `${Math.random() * 100}vw`;
    balloon.style.animationDelay = `${Math.random() * 2}s`;

    balloonContainer.appendChild(balloon);
  }
  setTimeout(() => {
    balloonContainer.remove();
  }, 6000);
}
function findProgress() {
  let numberOfCompletedWatchlists = 0;
  let totalNumberOfWatchlists = 0;
  let progressBar = document.querySelector(".watch_progress_bar");
  console.log(progressBar);
  for (let index = 0; index < watchlists.length; index++) {
    if (watchlists[index].movies.length > 0) {
      totalNumberOfWatchlists++;
    }
  }
  if (totalNumberOfWatchlists === 0) {
    progressBar.style.width = "0%";
    progressBar.textContent = "0% Completed";
    localStorage.setItem("progress", "0");
    return;
  }
  console.log(numberOfCompletedWatchlists, totalNumberOfWatchlists);
  watchlists.forEach((watchlist) => {
    if (
      watchlist.movies.length > 0 &&
      watchlist.movies.every((movie) => movie.watched === true)
    ) {
      numberOfCompletedWatchlists++;
    }
  });

  const progressBarWidthPercentage =
    (numberOfCompletedWatchlists / totalNumberOfWatchlists) * 100;
  if (progressBar) {
    progressBar.style.width = `${progressBarWidthPercentage}%`;
    progressBar.textContent = `${Math.round(
      progressBarWidthPercentage
    )}% Completed`;
  }
  localStorage.setItem("progress", progressBarWidthPercentage);

  console.log(`Progress: ${progressBarWidthPercentage}%`);

  if (progressBarWidthPercentage === 100) {
    launchBalloons();
  }
}
function initializeProgressBar() {
  const progressBar = document.querySelector(".watch_progress_bar");
  if (progressBar) {
    const savedProgress = localStorage.getItem("progress") || 0;

    progressBar.style.width = `${savedProgress}%`;
    progressBar.textContent = `${Math.round(savedProgress)}% Completed`;

    console.log(`Progress loaded: ${savedProgress}%`);
  }
}
function editWatchlist(index) {
  const watchlist = watchlists[index];
  const newName = prompt("Edit watchlist name:", watchlist.name);
  const newDescription = prompt(
    "Edit watchlist description:",
    watchlist.description
  );
  if (newName && newName.trim() !== "") {
    watchlist.name = newName.trim();
  }
  if (newDescription) {
    watchlist.description = newDescription.trim();
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlists));
  displayWatchlists();
  alert("Watchlist updated successfully");
}
function deleteWatchlist(index) {
  const deleted = watchlists.splice(index, 1);
  localStorage.setItem("watchlist", JSON.stringify(watchlists));
  console.log("deleted item", deleted);
  displayWatchlists();
  findProgress();
}
function removeMovieFromWatchlist(watchlistIndex, movieIndex) {
  watchlists[watchlistIndex].movies.splice(movieIndex, 1);
  localStorage.setItem("watchlist", JSON.stringify(watchlists));
  displayWatchlists();
  alert("Movie removed from the watchlist successfully");
  findProgress();
}
function openNav() {
  const links = document.querySelector("#myLinks");
  // console.log(topNav, links);
  if (links.style.display === "block") {
    links.style.display = "none";
  } else {
    links.style.display = "block";
  }
}
document.querySelector(".toggle_sidebar").addEventListener("click", openNav);

function switchTheme(e) {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    applyTheme("light");
  } else {
    applyTheme("dark");
  }
}
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  }
}
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme("light");
  }
}
document
  .querySelectorAll(".btn_toggle_theme")
  .forEach((btn) => btn.addEventListener("click", switchTheme));

getMovieData();
initializeProgressBar();
initializeTheme();
