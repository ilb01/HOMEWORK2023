// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCamiseta = document.querySelector("#lista-camiseta");
const inputSearch = document.querySelector('#input-search');
const orderFilterTag = document.querySelector('#orderFilter');
const shirtContent = document.querySelector(".list-content");


let shirtJson = [];
let articulosCarrito = [];
document.addEventListener("DOMContentLoaded", () => {
    cargarEventListeners();
    cargarCamiseta();
    inputSearch.addEventListener("keyup", function (event) {
        let searchInput = event.target.value;
        if (searchInput.length >= 3) {
            searchShirts(searchInput);
        }
        else if (searchShirts === 0) {
            pintarCamiseta();
        }
    })
    // inputSearch.addEventListener("keyup", searchGame);
    // handleFavorites();
    // loadFavorites();
    orderFilterTag.addEventListener("change", function () {
        sortCamiseta();
        // loadFavorites();
        // handleFavorites();
    });
});
// const searchGame = (event) => {
//     event.preventDefault();
//     const input = event.target;
//     if (input.value.length >= 3) {
//         let nameSearch = input.value.toLowerCase();
//         renderShirts(nameSearch);
//     } else if (input.value.length == 0) {
//         renderShirts();
//     }
// }

// FUNCIÓN DE ORDENAR (Clasificar por equipo)
const sortCamiseta = () => {
    let index = orderFilterTag.selectedIndex;
    let option = orderFilterTag.options[index];
    let nuevaLista = [];
    if (option.value === 'P') {
        nuevaLista = shirtJson.sort((a, b) => {
            if (a.team > b.team) return 1;
            else if (a.team < b.team) return -1;
            else return 0;
        });
    }
    else {
        return;
    }
    pintarCamiseta(nuevaLista);
};

function cargarEventListeners() {
    // Agregar camisetas del carrito
    listaCamiseta.addEventListener("click", agregarCamiseta);

    // Elimina camisetas del carrito
    carrito.addEventListener("click", eliminarCamiseta);

    // Muestra las camisetas del carrito de Local Storage cuando se carga la página en el navegador
    // Si la primera condición falla, inicializa la variable a []
    articulosCarrito = JSON.parse(localStorage.getItem("carritoCamiseta")) || [];
    generarCarritoHTML();

    // Vaciar el carrito cuando se pulsa en el icono x del carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = []; // reseteamos el arreglo
        contenedorCarrito.innerHTML = ""; // Eliminamos todo el HTML
        localStorage.removeItem("carritoCamiseta");
        document.querySelector("#num-camiseta").innerHTML = "0";
    });
}

const searchShirts = (name) => {
    cargarCamiseta(name).then(e => {
        pintarCamiseta(e);
    });
}

async function cargarCamiseta() {
    const res = await fetch("http://127.0.0.1:8800/api/shirts");
    const shirtJson = await res.json();
    pintarCamiseta(shirtJson);
}

function pintarCamiseta(listaCamiseta) {
    shirtContent.innerHTML = "";

    // Pinta todas las tarjetas con la información de las camisetas
    listaCamiseta.forEach((camiseta) => {
        let htmlCamiseta = `
        <article class="card shadow-sm bg-light">
            <div class="favorite">
                <i class="fa-solid fa-heart" style="color: #8c95a6;"  data-id="${camiseta.id}"></i>
            </div>
            <img src="img/camiseta/${camiseta.img}"  class="card-img-top" loading="lazy">
            <div class="card-body">
                <h4 class="card-title">${camiseta.name}</h4>
                <p class="card-text team">${camiseta.team}.</p>
                <hr>
                <p class="card-text price">${camiseta.price}€</p>
                <a href="#" class="boton-item agregar-carrito" data-id="${camiseta.id}">Agregar Al Carrito</a>
            </div>
            
        </article>`;
        shirtContent.innerHTML += htmlCamiseta;
    });
}

// GRID 
const changeView = (number) => {
    if (number === 4) {
        shirtContent.classList.replace("grid-6", "grid-4");
    } else if (number === 6) {
        shirtContent.classList.replace("grid-4", "grid-6");
    }
};


function agregarCamiseta(e) {
    // Previene de queno se envie el formulario al pulsar el botón de "Agregar carrito"
    e.preventDefault();
    let camiseta;

    // Comprueba que existen tarjetas (card) de las camisetas en la parte central
    if (e.target.classList.contains("agregar-carrito")) {
        camiseta = e.target.parentElement.parentElement;
    } else {
        console.error("Error leyedo datos, no hay camisetas :(");
        return false;
    }


    // Crear un objeto con el contenido de la camiseta actual
    const infoCamiseta = {
        imagen: camiseta.querySelector("img").src,
        name: camiseta.querySelector("h4").textContent,
        team: camiseta.querySelector(".team").textContent,
        price: camiseta.querySelector(".price").textContent,
        id: camiseta.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some((camiseta) => camiseta.id === infoCamiseta.id);
    if (existe) {
        const camisetas = articulosCarrito.map((camiseta) => {
            if (camiseta.id === infoCamiseta.id) {
                camiseta.cantidad++;
                return camiseta; // retorna el objeto actualizado
            } else {
                return camiseta; // retorna los objetos que no son los duplicados
            }
        });
        console.log("agregarCamiseta -> camisetas", camisetas);
        articulosCarrito = camisetas;
    } else {

        articulosCarrito.push(infoCamiseta);
    }

    console.log(articulosCarrito);
    generarCarritoHTML();
    mostrarAlert()
}

/**
 * Elimina una ropa del carrito
 */
function eliminarCamiseta(e) {
    if (e.target.classList.contains("borrar-camiseta")) {
        const camisetaId = e.target.getAttribute("data-id");

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter((camiseta) => camiseta.id !== camisetaId);

        generarCarritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Muestra el Carrito de compras en el HTML
function generarCarritoHTML() {
    contenedorCarrito.innerHTML = "";

    let cantidadTotal = 0;

    // Recorre el carrito y genera el HTML para cada item
    articulosCarrito.forEach((camiseta) => {
        const { imagen, name, team, price, cantidad, id } = camiseta; // Usamos destructuring
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100" loading="lazy">
            </td>
            <td>${name}</td>
            <td>${team}</td>
            <td>${price}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-camiseta" data-id="${id}" > X </a>
            </td>
        `;
        cantidadTotal += cantidad;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    // Pintar fila total
    if (cantidadTotal > 0) {
        let precioTotal = 45 * cantidadTotal;
        const row = document.createElement("tr");
        /*template*/
        row.innerHTML = `
        <td colspan="3">Total</td>
        <td>${precioTotal}€</td>
        <td>${cantidadTotal}</td>
        <td></td>
    `;
        contenedorCarrito.appendChild(row);
    }

    // Agregar el carrito de compras al storage
    localStorage.setItem("carritoCamiseta", JSON.stringify(articulosCarrito));

    calcularNumeroCamiseta();
}

// Calcula el total de  que existen en el carrito
function calcularNumeroCamiseta() {
    let cantidadTotal = 0;
    articulosCarrito.forEach((item) => (cantidadTotal += item.cantidad));

    let numCamiseta = document.querySelector("#num-camiseta");
    numCamiseta.innerHTML = cantidadTotal;
}


// SLIDER
const swiper = new Swiper(".swiper-hero", {
    // Optional parameters
    // slidesPerView: "auto",
    // spaceBetween: 15,
    // slidesPerGroupAuto: true,

    direction: "horizontal",
    loop: true,
    // allowTouchMove: true,
    // effect: "cube",
    autoplay: {
        delay: 5000,
        // pauseOnMouseEnter: true,
        // disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
        // clickable: true,
        // dynamicBullets: true
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
    },
});


// CORAZON

let shirtsFavorites = [];


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
        shirtsFavorites.push({ "id": idFavorite });
    } else {
        // Eliminar favorito
        shirtsFavorites = shirtsFavorites.filter(e => e.id != idFavorite);
    }
    // Guardar los favoritos
    localStorage.setItem("shirtsFavorites", JSON.stringify(shirtsFavorites));
};

// CARGAR LOS FAVORITOS DE localStorage
const loadFavorites = () => {
    if (localStorage.getItem("shirtsFavorites")) {
        shirtsFavorites = JSON.parse(localStorage.getItem("shirtsFavorites"));
    } else {
        shirtsFavorites = [];
    }

    shirtsFavorites.forEach(fav => {
        document.querySelector(`.fa-heart[data-id="${fav.id}"]`).classList.add("on");
    });
};

function mostrarAlert() {
    Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Camiseta añadido al carrito",
        showConfirmButton: false,
        timer: 1200,
    });
}