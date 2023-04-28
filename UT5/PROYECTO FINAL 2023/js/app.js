// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCamiseta = document.querySelector("#lista-camiseta");
const btnBuscador = document.querySelector("#submit-buscador");
let articulosCarrito = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarEventListeners();
    cargarCamiseta();
});


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

    btnBuscador.addEventListener("click", searchCamiseta);
}


function cargarCamiseta(pFilterTitle) {
    fetch("./data/camiseta.json")
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Something went wrong on api server!");
            }
        })
        .then((listaCamiseta) => {
            console.debug(listaCamiseta);
            if (pFilterTitle && pFilterTitle != "") {
                // Con expresiones regulares
                let re = new RegExp('\w' + pFilterTitle + '\w');
                item => re.test(item.name);

                listaCamiseta = listaCamiseta.filter((camiseta) =>
                    camiseta.name.toLowerCase().includes(pFilterTitle.toLowerCase())
                );
            }
            pintarCamiseta(listaCamiseta);
        })
        .catch((error) => {
            console.error(error);
        });
}

function pintarCamiseta(listaCamiseta) {
    let content = document.querySelector("#list-content");
    content.innerHTML = "";

    // Pinta todas las tarjetas con la información de las camisetas
    listaCamiseta.forEach((camiseta) => {
        let htmlCamiseta = `
        <div class="card">
            <img src="img/camiseta/${camiseta.img}"  class="imagen-camiseta">
            <div class="info-card">
                <h4>${camiseta.name}</h4>
                <p class="team">${camiseta.team}</p>
                <p class="price">${camiseta.price}€ <span class="u-pull-right">${camiseta.priceOffer}€</span></p>
                <a href="#" class="button agregar-carrito"
                data-id="${camiseta.id}">Agregar Al Carrito</a>
            </div>
        </div
    `;
        content.innerHTML += htmlCamiseta;
    });
}


/**
 * Lee el contenido del HTML al que le dimos click y lo añade al carrito
 * @param {*} e : evento de usuario
 */
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
        price: camiseta.querySelector(".price span").textContent,
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
                <img src="${imagen}" width="100">
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

/**
 * Busca por EQUIPO
 */
function searchCamiseta(e) {
    e.preventDefault();

    const team = document.getElementById("buscador").value;
    cargarCamiseta(team);
}


// Calcula el total de  que existen en el carrito
function calcularNumeroCamiseta() {
    let cantidadTotal = 0;
    articulosCarrito.forEach((item) => (cantidadTotal += item.cantidad));

    let numCamiseta = document.querySelector("#num-camiseta");
    numCamiseta.innerHTML = cantidadTotal;
}


