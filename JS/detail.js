const key = "?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US";
const getDetail = 'https://api.themoviedb.org/3/movie/';
const getImdb = 'https://api.themoviedb.org/3/movie/';
const imdbkey = '?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US';
let upper = document.getElementById("upper");
let background = document.getElementById("background");
let heading = document.getElementById("heading");
const imgUrl = 'https://image.tmdb.org/t/p/original/';
const imgurl = 'https://image.tmdb.org/t/p/original';
const first = document.getElementById("first");
const second = document.getElementById("second");
const third = document.getElementById("third");


let oneleft_btn = document.getElementsByClassName("oneLeft")[0];
let oneright_btn = document.getElementsByClassName("oneRight")[0];

let twoleft_btn = document.getElementsByClassName("twoLeft")[0];
let tworight_btn = document.getElementsByClassName("twoRight")[0];

let threeleft_btn = document.getElementsByClassName("threeLeft")[0];
let threeright_btn = document.getElementsByClassName("threeRight")[0];

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

const movieId = window.localStorage.getItem("movieid");
console.log(movieId);



function getMovies(url) {
    fetch(url).then(response => response.json())
        .then(data => {
            show(data);
        });
}

function getGenres(info) {
    let genre = '';
    for (let i in info) {
        genre = genre + info[i].name + ",";
    }
    return genre;
}

function show(data) {
    const { poster_path, original_title, backdrop_path, release_date, vote_average, overview } = data;
    let date = release_date.slice(0, 4);
    let safe = `${getImdb}${movieId}${imdbkey}`
    fetch(safe).then(response => response.json())
        .then(final => {

            upper.innerHTML = '';
            let card = document.createElement("div")
            card.classList.add('head');
            card.innerHTML = `
                <img src="${poster_path ? imgUrl + poster_path : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vrTUU3CKbUDThpm8aZzFXdTmai6PodNfXA&usqp=CAU"}" alt="">
                <div class="content">
                    <h1 id="title">${original_title}</h1>
                    <div class="details">
                    <h5>${getGenres(final.genres)}</h5>
                    <div style="display: flex;" >
                    <h3 id="date">${date}</h3>
                    <h3 id="rate"> <span class="imdb-star">IMDB </span><span class="fa fa-star checked"></span>${vote_average}</h3>
                    </div>
                    
                    </div>
                    <div class="btns">
                    <a target="_blank" href="watch.html" id="play">Watch <i class="fa fa-play"></i></a>
                    <a target="_blank" href="https://www.google.com/search?q=${original_title}">Google It</a>
                    </div>
                    </div>`

            upper.appendChild(card);


            heading.innerHTML = '';
            let card2 = document.createElement("div");
            card2.innerHTML = `
                <h1>Overview</h1>
                <p>
                    ${overview}
                </p>`

            heading.appendChild(card2);


            background.innerHTML = '';
            let card3 = document.createElement("div");
            card3.innerHTML = `
                <img src="${backdrop_path ? imgUrl + backdrop_path : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vrTUU3CKbUDThpm8aZzFXdTmai6PodNfXA&usqp=CAU"}" alt="">`

            background.appendChild(card3);


        });

}



getMovies(`https://api.themoviedb.org/3/movie/${movieId}?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US`);


const getcast = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US`; 


function knwoGender(gend){
 if(gend==2){
    let a = "male";
    return a;
 }
 else if(gend==1){
    let b = "female";
    return b;
 }
 else{
    let c ="unknown";
    return c;
 }
}

function getCast(url) {
    fetch(url).then(response => response.json())
        .then(data => {
            showcast(data.cast);
        });
}

function showcast(data) {
    first.innerHTML = '';
    data.forEach(movie => {
        const { name, gender ,known_for_department ,profile_path ,character } = movie;

        let card = document.createElement("a")
        card.setAttribute("href", `https://www.google.com/search?q=${name}`);
        card.setAttribute("target","_blank");
        card.innerHTML = `
            <div class="card">  
            <img src="${profile_path ? imgurl + profile_path : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vrTUU3CKbUDThpm8aZzFXdTmai6PodNfXA&usqp=CAU"}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4>${name}</h4>
                <div class="sub">
                    <p>${character}, ${known_for_department}</p>
                    <h3>${knwoGender(gender)}</h3>
                </div>
      `

      first.appendChild(card);
    });
}

getCast(getcast);

const transportMovie = function (movieid) {
    console.log("hey i am in details transport with movie id" + movieId)
    window.localStorage.setItem("movieid", String(movieid));
}

const similar = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US&page=1`;
const recomended = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US&page=1`; 

function getrecomendedMovies(url, ele) {
    fetch(url).then(response => response.json())
        .then(data => {
            showrecomendedMovies(data.results, ele);
        });
}

function showrecomendedMovies(data, ele) {
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
            <img src="${poster_path ? imgUrl + poster_path : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vrTUU3CKbUDThpm8aZzFXdTmai6PodNfXA&usqp=CAU"}" alt="${title}" class="poster">
            <div class="rest-card">
                <img src="${imgUrl}${backdrop_path}" alt="">
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

getrecomendedMovies(recomended,third);


const elementsimilar = document.getElementById("similar");

function getSimilarMovies(url, ele) {
    fetch(url).then(response => response.json())
        .then(data => {
            showSimilarMovies(data.results, ele);
        });
}

function showSimilarMovies(data, ele) {
    ele.innerHTML = '';
    data.forEach(movie => {
        const { poster_path, title, backdrop_path, release_date, vote_average, id } = movie;

        if (movie.length > 0) {

            let date = release_date.slice(0, 4);
            let safe = `${getImdb}${id}${imdbkey}`
            fetch(safe).then(response => response.json())
                .then(data => {

                    let card = document.createElement("a")
                    card.classList.add('card-item');
                    card.setAttribute("href", "detail.html")
                    card.setAttribute("onclick", `transportMovie(${id})`)
                    card.innerHTML = `
            <img src="${poster_path ? imgUrl + poster_path : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3vrTUU3CKbUDThpm8aZzFXdTmai6PodNfXA&usqp=CAU"}" alt="${title}" class="poster">
            <div class="rest-card">
            <img src="${imgUrl}${backdrop_path}" alt="">
            <div class="cont2">
            <h4>${title}</h4>
            <div class="sub">
            <p>${getGenres(data.genres)}, ${date}</p>
            <h3><span class="imdb-star">IMDB </span><span class="fa fa-star checked"></span>${vote_average}</h3>
            </div>
            </div>
            </div>`

                    ele.appendChild(card);
                    transportMovie(id);
                });
        }
        else {
            elementsimilar.innerHTML = "";
        }
    });
}

getrecomendedMovies(similar, second);

const video = document.getElementById("video");
const youtube = document.getElementById("youtube");
const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2db93f250eeb052e87cdc828c2faefeb&language=en-US`;

function getMovieVideo(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.results && data.results.length > 0) {
                const youtubeVideos = data.results.filter(video => video.site === "YouTube");
                if (youtubeVideos.length > 0) {
                    const firstVideoKey = youtubeVideos[0].key;
                    const iframe = document.createElement("iframe");
                    iframe.width = "760";
                    iframe.height = "400";
                    iframe.src = `https://www.youtube.com/embed/${firstVideoKey}`;
                    iframe.title = "YouTube Video";
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    iframe.allowFullscreen = true;
                    video.appendChild(iframe);
                } else {
                    youtube.style.display = "none";
                    console.log("No YouTube video found for this movie.");
                }
            } else {
                youtube.style.display = "none";
                console.log("Failed to fetch video data.");
            }
        })
        .catch(error => {
            console.error("Error fetching video data:", error);
            youtube.style.display = "none";
        });
}

getMovieVideo(videoUrl);

