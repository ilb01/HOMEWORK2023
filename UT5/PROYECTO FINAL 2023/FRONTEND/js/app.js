// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCamiseta = document.querySelector("#lista-camiseta");
const orderFilterTag = document.querySelector('#orderFilter');
const shirtContent = document.querySelector(".list-content");

let shirtsSearch = [];
let articulosCarrito = [];
document.addEventListener("DOMContentLoaded", () => {
    cargarEventListeners();
    cargarCamiseta();
    // CLICK DE ORDENAR (Clasificar por nombre o por precio)
    orderFilterTag.addEventListener("change", function () {
        sortCamiseta();
    });
});

const searchShirts = () => {
    const search = document.getElementById("input-search").value;
    const resultado = shirtJson.filter((shirt) => {
        if (search === "") return true;
        // .trim --> elimina los espacios en ambos lados
        return shirt.team.toLowerCase().includes(search.toLowerCase().trim());
    });

    pintarCamiseta(resultado);
};
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
    else if (option.value === 'A') {
        nuevaLista = shirtJson.filter((a) => a.league_name === "laliga");
    }
    else if (option.value === 'B') {
        nuevaLista = shirtJson.filter((a) => a.league_name === "ligue1");
    }
    else if (option.value === 'C') {
        nuevaLista = shirtJson.filter((a) => a.league_name === "premier league");
    }
    else if (option.value === 'D') {
        nuevaLista = shirtJson.filter((a) => a.league_name === "bundesliga");
    }
    else if (option.value === 'E') {
        nuevaLista = shirtJson.filter((a) => a.league_name === "serie a");
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

async function cargarCamiseta() {
    const res = await fetch("http://127.0.0.1:8800/api/shirts");
    shirtJson = await res.json();
    pintarCamiseta(shirtJson);
}

function pintarCamiseta(listaCamiseta) {
    shirtContent.innerHTML = "";
    // Pinta todas las tarjetas con la información de las camisetas
    listaCamiseta.forEach((camiseta) => {
        let htmlCamiseta = `
        <article class="card shadow-sm bg-light">
            <img src="img/camiseta/${camiseta.img}"  class="card-img-top" loading="lazy">
            <div class="card-body">
                <h4 class="card-title">${camiseta.name}</h4>
                <p class="card-text team">${camiseta.team}.</p>
                <select class="tallas">
                    <option value="${camiseta.tallas[0]}">${camiseta.tallas[0]}</option>
                    <option value="${camiseta.tallas[1]}">${camiseta.tallas[1]}</option>
                    <option value="${camiseta.tallas[2]}">${camiseta.tallas[2]}</option>
                    <option value="${camiseta.tallas[3]}">${camiseta.tallas[3]}</option>
                    <option value="${camiseta.tallas[4]}">${camiseta.tallas[4]}</option>
                    <option value="${camiseta.tallas[5]}">${camiseta.tallas[5]}</option>
                </select>
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
        tallas: camiseta.querySelector(".tallas").value,
        id: camiseta.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some((camiseta) => camiseta.id == infoCamiseta.id);
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
        articulosCarrito = articulosCarrito.filter((camiseta) => camiseta.id != camisetaId);

        generarCarritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Muestra el Carrito de compras en el HTML
function generarCarritoHTML() {
    contenedorCarrito.innerHTML = "";

    let cantidadTotal = 0;

    // Recorre el carrito y genera el HTML para cada item
    articulosCarrito.forEach((camiseta) => {
        const { imagen, name, team, price, cantidad, tallas, id } = camiseta; // Usamos destructuring
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100" loading="lazy">
            </td>
            <td>${name}</td>
            <td>${team}</td>
            <td>${tallas}</td>
            <td>${price}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-camiseta" data-id="${id}">X</a>
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
        <td colspan="4">Total</td>
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

function mostrarAlert() {
    Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Camiseta añadido al carrito",
        showConfirmButton: false,
        timer: 1200,
    });
}