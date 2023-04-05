let main = document.getElementById("main");
let search = document.getElementById("Search_input");
let form = document.getElementById("form");

const t1 = document.getElementsByClassName("tag")[0];
const t2 = document.getElementsByClassName("tag")[1];
const t3 = document.getElementsByClassName("tag")[2];
const t4 = document.getElementsByClassName("tag")[3];

const key = '?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US&page=1';
const imgUrl = 'https://image.tmdb.org/t/p/original/';
const baseUrl = 'https://api.themoviedb.org/3/';
const popular_url = `${baseUrl}movie/popular${key}`;
const latest_url = `${baseUrl}movie/now_playing${key}`;
const upcoming_url = `${baseUrl}movie/upcoming${key}`;
const top_rated_url = `${baseUrl}movie/top_rated${key}`;
const searchUrl = `https://api.themoviedb.org/3/search/movie${key}&query=`;
const getImdb = 'https://api.themoviedb.org/3/movie/';
const imdbkey = '?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US';
const discoverUrl = `${baseUrl}discover/movie?sort_by=popularity.desc&api_key=2db93f250eeb052e87cdc828c2faefeb`;

function getMovies(url) {
    fetch(url).then(response => response.json())
        .then(data => {
            show(data.results);
        });
}

function getGenres(info) {
    let genre = '';
    for (let i in info) {
        genre = genre + info[i].name + ",";
    }
    return genre;
}

const transportMovie = function (movieid) {
    window.localStorage.setItem("movieid", String(movieid));
}

function show(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { poster_path, title, backdrop_path, release_date, vote_average, id } = movie;
        let date = release_date.slice(0, 4);
        let safe = `${getImdb}${id}${imdbkey}`
        fetch(safe).then(response => response.json())
            .then(final => {

                let card = document.createElement("a")
                card.classList.add('card-item');
                card.setAttribute("href", "detail.html")
                card.setAttribute("onclick", `transportMovie(${id})`)
                card.innerHTML = `
            <div class="card">  
    <img src="${poster_path ? imgUrl + poster_path : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vrTUU3CKbUDThpm8aZzFXdTmai6PodNfXA&usqp=CAU"}" class="card-img-top" alt="...">
    <div class="card-body">
        <h4>${title}</h4>
        <div class="sub">
            <p>${getGenres(final.genres)}, ${date}</p>
            <h3><span class="imdb-star">IMDB </span><span class="fa fa-star checked"></span>${vote_average}
            </h3>
</div>
          `

                main.appendChild(card);
            });
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchUrl + searchTerm);
    }
    else {
        main.innerHTML = `<div class="statement" >Type query to start search..</div>`
    }

})


t1.addEventListener('click', () => {
    let id = t1.id;
    main.classList.add('main');
    getMovies(discoverUrl + '&with_genres=' + id);
})
t2.addEventListener('click', () => {
    let id = t2.id;
    main.classList.add('main');
    getMovies(discoverUrl + '&with_genres=' + id);
})
t3.addEventListener('click', () => {
    let id = t3.id;
    main.classList.add('main');
    getMovies(discoverUrl + '&with_genres=' + id);
})
t4.addEventListener('click', () => {
    let id = t4.id;
    main.classList.add('main');
    getMovies(discoverUrl + '&with_genres=' + id);
})