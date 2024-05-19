let oneleft_btn = document.getElementsByClassName("oneLeft")[0];
let oneright_btn = document.getElementsByClassName("oneRight")[0];

let twoleft_btn = document.getElementsByClassName("twoLeft")[0];
let tworight_btn = document.getElementsByClassName("twoRight")[0];

let threeleft_btn = document.getElementsByClassName("threeLeft")[0];
let threeright_btn = document.getElementsByClassName("threeRight")[0];

let fourleft_btn = document.getElementsByClassName("fourLeft")[0];
let fourright_btn = document.getElementsByClassName("fourRight")[0];

let popular = document.getElementById('popular');
let latest = document.getElementById('latest');
let upcoming = document.getElementById('upcoming');
let top_rated = document.getElementById('top_rated');

let cards = document.getElementsByClassName("cards")[0];
let search = document.getElementsByClassName("search")[0];
let search_input = document.getElementById("Search-input");
let main = document.getElementsByTagName("main")[0];
const card_item = document.getElementsByClassName("card-item");


let first = document.getElementById("first");
let second = document.getElementById("second");
let third = document.getElementById("third");
let fourth = document.getElementById("fourth");
const t1 = document.getElementsByClassName("tag")[0];
const t2 = document.getElementsByClassName("tag")[1];
const t3 = document.getElementsByClassName("tag")[2];
const t4 = document.getElementsByClassName("tag")[3];


let video = document.getElementsByTagName('video')[0];
let play = document.getElementById('play')

play.addEventListener('click', () => {

  if (video.paused) {
    video.play();
    play.innerHTML = `Play <i class="fa fa-pause"></i>`
  } else {
    video.pause();
    play.innerHTML = `Watch <i class="fa fa-play"></i>`
  }

})

oneleft_btn.addEventListener('click', () => {
  first.scrollLeft -= 850;
});
oneright_btn.addEventListener('click', () => {
  first.scrollLeft += 850;
});

twoleft_btn.addEventListener('click', () => {
  second.scrollLeft -= 850;
});
tworight_btn.addEventListener('click', () => {
  second.scrollLeft += 850;
});

threeleft_btn.addEventListener('click', () => {
  third.scrollLeft -= 850;
});
threeright_btn.addEventListener('click', () => {
  third.scrollLeft += 850;
});

fourleft_btn.addEventListener('click', () => {
  fourth.scrollLeft -= 850;
});
fourright_btn.addEventListener('click', () => {
  fourth.scrollLeft += 850;
});

const key = '?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US&page=1';
const imgUrl = 'https://image.tmdb.org/t/p/original/';
const baseUrl = 'https://api.themoviedb.org/3/';
const popular_url = `${baseUrl}movie/popular${key}`;
const latest_url = `${baseUrl}movie/now_playing${key}`;
const upcoming_url = `${baseUrl}movie/upcoming${key}`;
const top_rated_url = `${baseUrl}movie/top_rated${key}`;
const discoverUrl = `${baseUrl}discover/movie?sort_by=popularity.desc&api_key=2db93f250eeb052e87cdc828c2faefeb`;
const searchUrl = `https://api.themoviedb.org/3/search/movie${key}&query=aven`;
const getImdb = 'https://api.themoviedb.org/3/movie/';
const imdbkey = '?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US';

getMovies(popular_url, first);
getMovies(latest_url, second);
getMovies(upcoming_url, third);
getMovies(top_rated_url, fourth);

const transportMovie = function (movieid) {
  window.localStorage.setItem("movieid", String(movieid));
}

function getMovies(url, ele) {
  fetch(url).then(response => response.json())
    .then(data => {
      show(data.results, ele);
    });
}

function show(data, ele) {
  ele.innerHTML = '';
  data.forEach(movie => {
    const { poster_path, title, backdrop_path, release_date, vote_average, id } = movie;
    let date = release_date.slice(0, 4);
    let safe = `${getImdb}${id}${imdbkey}`
    fetch(safe).then(response => response.json())
      .then(data => {

        let card = document.createElement("a")
        card.classList.add('card-item');
        card.setAttribute("href", "detail.html")
        card.setAttribute("onclick", `transportMovie(${id})`)
        card.innerHTML = `
        <img loading="lazy" src="${poster_path ? imgUrl + poster_path : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vrTUU3CKbUDThpm8aZzFXdTmai6PodNfXA&usqp=CAU"}" alt="${title}" class="poster">
        <div class="rest-card">
            <img loading="lazy" src="${imgUrl}${backdrop_path}" alt="">
            <div class="cont2">
                <h4>${title}</h4>
                <div class="sub">
                    <p>${getGenres(data.genres)}, ${date}</p>
                    <h3><span class="imdb-star">IMDB </span><span class="fa fa-star checked"></span>${vote_average}</h3>
                </div>
            </div>
        </div>`

        ele.appendChild(card);
        // transportMovie(id);
      });
  });
}

function getGenres(info) {
  let genre = '';
  for (let i in info) {
    genre = genre + info[i].name + ",";
  }
  return genre;
}

const genre = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

t1.addEventListener('click', () => {
  let id = t1.id;
  main.classList.add('main');
  getSelectedMovies(discoverUrl + '&with_genres=' + id);
})
t2.addEventListener('click', () => {
  let id = t2.id;
  main.classList.add('main');
  getSelectedMovies(discoverUrl + '&with_genres=' + id);
})
t3.addEventListener('click', () => {
  let id = t3.id;
  main.classList.add('main');
  getSelectedMovies(discoverUrl + '&with_genres=' + id);
})
t4.addEventListener('click', () => {
  let id = t4.id;
  main.classList.add('main');
  getSelectedMovies(discoverUrl + '&with_genres=' + id);
})

function getSelectedMovies(url) {
  fetch(url).then(response => response.json())
    .then(data => {
      showSelectedMovies(data.results);
    });
}

function showSelectedMovies(data) {
  main.innerHTML = '';
  data.forEach(movie => {
    const { poster_path, title, backdrop_path, release_date, vote_average, id } = movie;
    let date = release_date.slice(0, 4);
    let safe = `${getImdb}${id}${imdbkey}`
    fetch(safe).then(response => response.json())
      .then(data => {

        let card = document.createElement("a")
        // card.classList.add('card-item');
        card.setAttribute("href", "detail.html")
        card.setAttribute("onclick", `transportMovie(${id})`)
        card.innerHTML = `
                <div class="card1">  
                <img src="${poster_path ? imgUrl + poster_path : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vrTUU3CKbUDThpm8aZzFXdTmai6PodNfXA&usqp=CAU"}" class="card1-img-top" alt="...">
                <div class="card1-body">
                        <h4>${title}</h4>
                        <div class="hub">
                            <p>${getGenres(data.genres)}, ${date}</p>
                            <h3><span class="imdb-star">IMDB </span><span class="fa fa-star checked"></span>${vote_average}
                            </h3>
                </div>
              `

        main.appendChild(card);
      });
  });
}



