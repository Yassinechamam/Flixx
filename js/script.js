const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1
  },
  api: {
    apiKey: "74b2f293fccc6e3dea0460908a219e86",
    apiUrl: "https://api.themoviedb.org/3/"
  }
};

// Display movies data
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");

  console.log(results);
  results.forEach((movie) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
        <div class="card">
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
                : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        </div>
        `;
    document.querySelector("#popular-movies").appendChild(cardDiv);
  });
}

// Display Movie Details
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  displayBackgroundImage("movie", movie.backdrop_path);

  console.log(movie);
  const detailsTop = document.createElement("div");
  detailsTop.classList.add("details-top");
  detailsTop.innerHTML = `
  <div>
  ${
    movie.poster_path
      ? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />`
      : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
  />`
  }
</div>
<div>
  <h2>${movie.title}</h2>
  <p>
    <i class="fas fa-star text-primary"></i>
    ${movie.vote_average.toFixed(1)}/10
  </p>
  <p class="text-muted">Release Date: ${movie.release_date}</p>
  <p>
  ${movie.overview}
  </p>
  <h5>Genres</h5>
  <ul class="list-group">
    <li>${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}</li>
    
    
  </ul>
  <a href="${
    movie.homepage
  }" target="_blank" class="btn">Visit Movie Homepage</a>
</div>
  `;

  document.querySelector("#movie-details").appendChild(detailsTop);

  const detailsBottom = document.createElement("div");

  detailsBottom.classList.add("details-bottom");
  detailsBottom.innerHTML = `
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> ${movie.budget.toLocaleString(
      "en-US"
    )}</li>
    <li><span class="text-secondary">Revenue:</span> ${movie.revenue.toLocaleString(
      "en-US"
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${movie.production_companies
    .map((company) => `<ul>${company.name}</ul>`)
    .join("")}</div>
  `;

  document.querySelector("#movie-details").appendChild(detailsBottom);
}

// Display TV Details
async function displayTVDetails() {
  const tvId = window.location.search.split("=")[1];

  const tv = await fetchAPIData(`tv/${tvId}`);

  // Overlay for background image
  displayBackgroundImage("tv", tv.backdrop_path);

  console.log(tv);
  const detailsTop = document.createElement("div");
  detailsTop.classList.add("details-top");
  detailsTop.innerHTML = `
  <div>
  ${
    tv.poster_path
      ? `<img
      src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
      class="card-img-top"
      alt="${tv.name}"
    />`
      : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${tv.name}"
  />`
  }
</div>
<div>
  <h2>${tv.name}</h2>
  <p>
    <i class="fas fa-star text-primary"></i>
    ${tv.vote_average.toFixed(1)}/10
  </p>
  <p class="text-muted">Release Date: ${tv.first_air_date}</p>
  <p>
  ${tv.overview}
  </p>
  <h5>Genres</h5>
  <ul class="list-group">
    <li>${tv.genres.map((genre) => `<li>${genre.name}</li>`).join("")}</li>
    
    
  </ul>
  <a href="${tv.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
</div>
  `;

  document.querySelector("#show-details").appendChild(detailsTop);

  const detailsBottom = document.createElement("div");

  detailsBottom.classList.add("details-bottom");
  detailsBottom.innerHTML = `
  <h2>TV Show INFO</h2>
  <ul>
    <li><span class="text-secondary">Popularity:</span> ${tv.popularity.toLocaleString(
      "en-US"
    )}</li>
    <li><span class="text-secondary">Seasons:</span> ${tv.seasons.map(
      (season) => season.name
    )}</li>
    
    <li><span class="text-secondary">Status:</span> ${tv.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${tv.production_companies
    .map((company) => `<ul>${company.name}</ul>`)
    .join("")}</div>
  `;

  document.querySelector("#show-details").appendChild(detailsBottom);
}

// Display TV Shows
async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");

  console.log(results);
  results.forEach((movie) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
      <div class="card">
        <a href="tv-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.name}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.name}"
          />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.first_air_date}</small>
          </p>
        </div>
      </div>
      `;
    document.querySelector("#popular-shows").appendChild(cardDiv);
  });
}

// Display backdrop on Details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.4";

  if (type === "movie") {
    document.querySelector("#movie-details").append(overlayDiv);
  } else {
    document.querySelector("#show-details").append(overlayDiv);
  }
}

// Display Search Movies/Shows
async function displaySearchResults(results) {
  // Clear previous results
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach((result) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
        
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
                src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                class="card-img-top"
                alt="${global.search.type === 'movie' ? result.title : result.name}"
              />`
                : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${global.search.type === 'movie' ? result.title : result.name}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
            </p>
          </div>
        
        `;

    document.querySelector('#search-results-heading').innerHTML = ` <h2>${results.length} of ${global.search.totalResults} for ${global.search.term} </h2>`;
    document.querySelector("#search-results").appendChild(cardDiv);
  });

  displayPagination();
}

// Create and Display Pagination for search
function displayPagination() {

  const div = document.createElement("div");
  div.classList.add("pagination");

  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `
  document.querySelector('#pagination').appendChild(div);

  // Disable prev button on first page
  if(global.search.page ===  1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable next button on last page
  if(global.search.page ===  global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next page
  document.querySelector('#next').addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  })

  // Prev page
  document.querySelector('#prev').addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  })
}




// Activate the swipper
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  console.log(results);

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
    
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
      </h4>
    
    `;

    document.querySelector(".swiper-wrapper").appendChild(div);
    initSwipper();
  });
}

// Swipper
function initSwipper() {
  const swiper = new Swiper('.swiper', {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      700: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  })
}

// Search
async function search() {
  // Get the data from the url: "/search.html?type=movie&search-term=baki"
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();
    
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found');
      return;
    }

    showAlert('Successful Search', "success");
    displaySearchResults(results);
    document.querySelector("#search-term").value = '';


  } else {
    showAlert('Please enter a search term');
  }

}


// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  // Spinner
  showSpinner();

  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();

  // Hide spinner
  hideSpinner();

  return data;
}

// Make Request to search
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  // Spinner
  showSpinner();

  const res = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await res.json();

  // Hide spinner
  hideSpinner();

  return data;
}

//Show and Hide Swippers
showSpinner = () => {
  document.querySelector(".spinner").classList.add("show");
};

hideSpinner = () => {
  document.querySelector(".spinner").classList.remove("show");
};

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// Show Alert
function showAlert (message, className = 'error') {
  const divAlert = document.createElement("div");
  divAlert.classList.add('alert', className);
  divAlert.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(divAlert);

  setTimeout(() => divAlert.remove(), 3000);
}

// Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayTVDetails();
      break;
    case "/search.html":
      search();
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
