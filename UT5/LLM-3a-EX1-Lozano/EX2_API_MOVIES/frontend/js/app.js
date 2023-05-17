// Referencia a nuestro grid
const grid = document.querySelector('#grid-movies');

// FUNCION INIT
function init() {
    getMovies();
}
init();
// Para coger el JSON de URL de forma async
async function getMovies() {
    // Para poner el URL de donde esta el JSON 
    
    const res = await fetch('https://api.themoviedb.org/3/search/movie?api_key=192e0b9821564f26f52949758ea3c473&query=batman');

    // Coger los datos el JSON
    const data = await res.json();

    // FOREACH para devolver el resultado de JSON
    // results --> viene de atributo de JSON
    data.results.forEach( movie => {
        grid.innerHTML+=`
        <article>
            <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}">
            <h2>${movie.title}</h2>
        </article>
        `;
        
    });
}