

// PARA CARGAR PELICULAS
const cargarJuegos = async () => {
    try {
        const respuesta = await fetch(`http://localhost:8800/api/games/`);
        if (respuesta.status === 200) {
            const datos = await respuesta.json(); 
            pintarGames(datos);
        }
    }
    catch{(error => {
        console.log(error);
    })}
}

// IMPRIMIR JSON PELICULA
function pintarGames(listaJuego) {
    let content = document.querySelector("#list-content");
    content.innerHTML = `<div>#</div>
    <div>Name</div>
    <div>Description</div>
    <div>Pegi</div>`;
    listaJuego.forEach((juego) => {
        // PARA COGER LA ARRAY DE JSON
        let htmlJuego = `
        <div>
            <h1>${juego.name}</h1>
            <p>${juego.description}</p>
            <p>${juego.pegi}</p>
        </div>
    `;
        content.innerHTML += htmlJuego;
    });
}
function searchJuego(e) {
    e.preventDefault();

    const name = document.getElementById("buscador").value;
    cargarJuegos(name);
}
function init() {
    cargarJuegos();
    btnBuscador.addEventListener("click", searchJuego);
}
init();