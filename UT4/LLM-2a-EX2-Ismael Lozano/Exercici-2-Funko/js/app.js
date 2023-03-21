const orderFilterTag = document.querySelector('#orderFilter');
const figurasTag = document.querySelector('.grid-figures');

let figurasJSON = [];
let figurasFavorites = [];

window.onload = async () => {
    const respuesta = await fetch('./data/figuras.json');
    figurasJSON = await respuesta.json();
    // Para pintar el json 
    printFiguras(figurasJSON);
    handleFavorites();
    loadFavorites();

    // CLICK DE ORDENAR (Clasificar por nombre o por precio)
    orderFilterTag.addEventListener("change", function () {
        sortFiguras();
        loadFavorites();
        handleFavorites();
    });

};


// FUNCIÓN DE ORDENAR (Clasificar por nombre o por precio)
const sortFiguras = () => {
    let index = orderFilterTag.selectedIndex;
    let option = orderFilterTag.options[index];
    let nuevaLista = [];
    if (option.value === 'P') {
        nuevaLista = figurasJSON.sort((a, b) => a.price - b.price);
    } else if (option.value === 'N') {
        nuevaLista = figurasJSON.sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (a.name < b.name) return -1;
            else return 0;
        });
    } else {
        return;
    }
    printFiguras(nuevaLista);
};

const changeView = (number) => {
    if (number === 4) {
        figurasTag.classList.replace("grid-6", "grid-4");
    } else if (number === 6) {
        figurasTag.classList.replace("grid-4", "grid-6");
    }
};


const printFiguras = (figuras) => {
    figurasTag.innerHTML = "";
    figuras.forEach(e => {
        let template = `    
        <article class="card shadow-sm bg-light">
                        <img src="./img/${e.image}" class="card-img-top"
                            alt="">
                        <div class="card-body">
                            <h5 class="card-title"><a href="detail.html">${e.name}</a></h5>
                            <p class="card-text">${e.description}.</p>
                            <hr>
                            <p class="card-text price">${e.price}€</p>
                            <button class="btn btn-primary">Añadir carrito</button>
                        </div>
                        <div class="favorite">
                            <i class="fas fa-heart" data-id="${e.id}"></i>
                        </div>
                    </article>`;
        figurasTag.innerHTML += template;
    });
};


let shoesFavorites = [];


const handleFavorites = () => {
    const favoritesList = document.querySelectorAll(".fa-heart");
    favoritesList.forEach(fav => {
        fav.addEventListener("click", function () {
            // This es el icono HTML en el cual el usuario acaba de pulsar
            this.classList.toggle("on");
            saveFavorites(this);
        });
    });
};

// FUNCION DE GUARDAR LOS FAVORITOS
const saveFavorites = (favObj) => {
    let idFavorite = favObj.dataset.id;
    if (favObj.classList.contains("on")) {
        // Agregar favorito
        figurasFavorites.push({ "id": idFavorite });
    } else {
        // Eliminar favorito
        figurasFavorites = figurasFavorites.filter(e => e.id != idFavorite);
    }
    // Guardar los favoritos  
    localStorage.setItem("figurasFavorites", JSON.stringify(figurasFavorites));
};

// CARGAR LOS FAVORITOS DE localStorage
const loadFavorites = () => {
    if (localStorage.getItem("figurasFavorites")) {
        figurasFavorites = JSON.parse(localStorage.getItem("figurasFavorites"));
    } else {
        figurasFavorites = [];
    }

    figurasFavorites.forEach(fav => {
        document.querySelector(`.fa-heart[data-id="${fav.id}"]`).classList.add("on");
    });
};