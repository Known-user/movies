const movieId = window.localStorage.getItem("movieid");
console.log(movieId);

let view = document.getElementById("view");
view.innerHTML = view.innerHTML+ `
<iframe src="https://www.2embed.cc/embed/${movieId}" width="100%" height="100%" frameborder="0" scrolling="no"  allowfullscreen></iframe>
`