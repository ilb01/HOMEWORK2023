function init() {
    cargarPeliculas();
    pintarPeliculas();
}

// PARA CARGAR PELICULAS
const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES`);
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            pintarPeliculas(datos.results);
        }
        else if (respuesta.status === 401) console.log('Llave incorrecta');
        else if (respuesta.status === 404) console.log('La pelicula selecionado no exite');
        else console.log('Error sin saber');
    }
    catch{(error => {
        console.log(error);
    })}
}

// IMPRIMIR JSON PELICULA
function pintarPeliculas(listaPeli) {
    let content = document.querySelector("#list-content");
    content.innerHTML = "";
    listaPeli.forEach((pelis) => {
        // PARA COGER LA ARRAY DE JSON
        let htmlPeli = `
        <div class="pelicula">
            <img src="https://image.tmdb.org/t/p/w500${pelis.poster_path}">
            <p>${pelis.original_title}</p>
        </div>
    `;
        content.innerHTML += htmlPeli;
    });
}
init();