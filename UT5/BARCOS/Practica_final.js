// // El tablero del jugador 1 (mi tablero)
// const canvas1 = document.getElementById("canvas1");
// // El tablero del jugador 2
// const canvas2 = document.getElementById("canvas2");

// // Te permite dibujar y manipular gráficos dentro del canvas
// const context1 = canvas1.getContext('2d');
// const context2 = canvas2.getContext('2d');

// // Constante resetear 
// const resetear = document.getElementById("resetear");
// //resetear.addEventListener("click", reiniciarCanvas);

// const guardar = document.getElementById("guardar");

// const empezar = document.getElementById("empezar");

// const informacion = document.getElementById("info");

// const numero_filas = 11;
// const numero_columnas = 11;
// const ancho_celda = canvas1.width / numero_columnas;
// const altura_celda = canvas1.height / numero_filas;

// const tablero = [
//     [' ', ' ', ' ', ' ', ' '], // fila 0
//     [' ', ' ', ' ', ' ', ' '], // fila 1
//     [' ', ' ', 'PO ', 'PO ', 'PO ', 'PO ', 'PO '], // fila 2
//     [' ', ' ', ' ', ' ', ' '], // fila 3
//     [' ', 'DE', ' ', ' ', '', ' '],  // fila 4
//     [' ', 'DE ', ' ', '', ' ', ' ', ' ', ' ', 'AC '],  // fila 5
//     [' ', 'DE ', ' ', '', ' ', ' ', ' ', ' ', 'AC '],  // fila 6
//     [' ', ' ', ' ', 'SU ', 'SU ', 'SU ', ' ', ' ', 'AC '],    // fila 7
//     [' ', ' ', ' ', '', ' ', ' ', ' ', ' ', 'AC '],    // fila 8
//     [' ', ' ', ' ', ' ', ' ', ' ', 'LA ', 'LA '],  // fila 9
//     [' ', ' ', ' ', '', ' ']  // fila 10   
// ];


// pintaCuadricula(context1);
// pintaCuadricula(context2);


// // Función que pinta la cuadricula
// function pintaCuadricula(context) {
//     for (let fila = 0; fila < numero_filas; fila++) {
//         rellenoCelda(context, fila, 0, "lightpink", fila);
//         for (let columna = 0; columna < numero_columnas; columna++) {
//             context.strokeRect(columna * ancho_celda, fila * altura_celda, ancho_celda, altura_celda);
//             rellenoCelda(context, 0, columna, "lightpink", columna);
//         }
//     }

//     carga();
// };

// // Función que rellena la celda
// function rellenoCelda(context, fila, columna, color, texto) {
//     context.fillStyle = color;
//     context.fillRect(fila * ancho_celda, columna * altura_celda, ancho_celda, altura_celda);
//     context.fillStyle = "Black";
//     context.fillText(texto, fila * ancho_celda + ancho_celda / 2.5, columna * altura_celda + altura_celda / 2.5);
// };

// // Función que carga los barcos
// function carga(context) {
//     let url = context == context1 ? "./Practica_final.json" : "./Practica_final_2.json";

//     fetch(url)
//         .then(response => {
//             if (response.ok) return response.json();
//             else {
//                 alert("No s'ha pogut completar la càrrega. Error " + response.status)
//             }
//         })
//         .then(data => {
//             data.barcos.forEach(barco => {
//                 dibujaBarco(barco);
//             });
//         });

// };

// // Función que dibuja los barcos dentro de los dos canvas 
// function dibujaBarco(barco) {
//     var posiciones = barco.posicion;
//     posiciones.forEach(posicion => {
//         let fila = posicion.fila;
//         let columna = posicion.columna;

//         context1.fillStyle = "lightblue";
//         context1.fillRect(columna * ancho_celda, fila * altura_celda, ancho_celda, altura_celda);
//     });

// };


// // Funcion para que cuando hagas click en una cuadrícula del tablero del enemigo se rellene por decirlo asi
// canvas2.addEventListener('click', function (event) {

//     const fila = Math.floor((event.clientX - canvas2.offsetLeft) / ancho_celda);
//     const columna = Math.floor((event.clientY - canvas2.offsetTop) / altura_celda);

//     // Verifica si el disparo de la máquina ha acertado en un barco o ha sido agua
//     const agua = true;
//     for (const barco of Practica_final.json) { // Aquí es donde tengo el error
//         for (const posicion of barco.barcos.posicion) {
//             if (posicion.fila == fila && posicion.columna == columna) {
//                 if (barco.vidas > 0) {
//                     barco.vidas--;
//                     agua = false;
//                     escribeLog("Tocado")
//                     rellenoCelda(context2, fila, columna, "red", "X");
//                     if (barco.vidas === 0) {
//                         escribeLog("Tocado y hundido");
//                     } else {
//                         escribeLog("Tocado");
//                     }
//                 }
//                 break;
//             }
//         }
//     }
//     if (agua) {
//         escribeLog("Agua");
//         rellenoCelda(context2, fila, columna, "blue", "A");
//     }

// });


// function escribeLog(texto) {
//     var log = document.getElementById("texto");
//     log.textContent = log.textContent + "\n" + texto;
// }

// function reiniciarCanvas() {
//     context1.context.clearRect(0, 0, canvas1.width, canvas1.height);
//     context2.context.clearRect(0, 0, canvas2.width, canvas2.height);
//     pintaCuadricula(context1);
//     pintaCuadricula(context2);
//     carga();

// }


// El tablero del jugador 1 (mi tablero)
const canvas1 = document.getElementById("canvas1");
// El tablero del jugador 2
const canvas2 = document.getElementById("canvas2");

// Te permite dibujar y manipular gráficos dentro del canvas
const context1 = canvas1.getContext("2d");
const context2 = canvas2.getContext("2d");

// Constante resetear
const resetear = document.getElementById("resetear");
//resetear.addEventListener("click", reiniciarCanvas);

const guardar = document.getElementById("guardar");

const empezar = document.getElementById("empezar");

const informacion = document.getElementById("info");

const numero_filas = 11;
const numero_columnas = 11;
const ancho_celda = canvas1.width / numero_columnas;
const altura_celda = canvas1.height / numero_filas;

const tablero = [
    [" ", " ", " ", " ", " "], // fila 0
    [" ", " ", " ", " ", " "], // fila 1
    [" ", " ", "PO ", "PO ", "PO ", "PO ", "PO "], // fila 2
    [" ", " ", " ", " ", " "], // fila 3
    [" ", "DE", " ", " ", "", " "], // fila 4
    [" ", "DE ", " ", "", " ", " ", " ", " ", "AC "], // fila 5
    [" ", "DE ", " ", "", " ", " ", " ", " ", "AC "], // fila 6
    [" ", " ", " ", "SU ", "SU ", "SU ", " ", " ", "AC "], // fila 7
    [" ", " ", " ", "", " ", " ", " ", " ", "AC "], // fila 8
    [" ", " ", " ", " ", " ", " ", "LA ", "LA "], // fila 9
    [" ", " ", " ", "", " "], // fila 10
];

pintaCuadricula(context1);
pintaCuadricula(context2);

// Función que pinta la cuadricula
function pintaCuadricula(context) {
    for (let fila = 0; fila < numero_filas; fila++) {
        rellenoCelda(context, fila, 0, "lightpink", fila);
        for (let columna = 0; columna < numero_columnas; columna++) {
            context.strokeRect(
                columna * ancho_celda,
                fila * altura_celda,
                ancho_celda,
                altura_celda
            );
            rellenoCelda(context, columna, fila, "lightpink", columna);
        }
    }

    carga();
}

// Función que rellena la celda
function rellenoCelda(context, columna, fila, color, texto) {
    context.fillStyle = color;
    context.fillRect(
        columna * ancho_celda,
        fila * altura_celda,
        ancho_celda,
        altura_celda
    );
    context.fillStyle = "Black";
    context.fillText(
        texto,
        columna * ancho_celda + ancho_celda / 2.5,
        fila * altura_celda + altura_celda / 2.5
    );
}

// Función que carga los barcos
function carga(context) {
    let url = context == context1 ? "./Practica_final.json" : "./Practica_final_2.json";

    fetch(url)
        .then((response) => {
            if (response.ok) return response.json();
            else {
                alert("No s'ha pogut completar la càrrega. Error " + response.status);
            }
        })
        .then((data) => {
            data.barcos.forEach((barco) => {
                dibujaBarco(barco);
            });
        });
}

// Función que dibuja los barcos dentro de los dos canvas
function dibujaBarco(barco) {
    var posiciones = barco.posicion;
    posiciones.forEach((posicion) => {
        let fila = posicion.fila;
        let columna = posicion.columna;

        context1.fillStyle = "lightblue";
        context1.fillRect(
            columna * ancho_celda,
            fila * altura_celda,
            ancho_celda,
            altura_celda
        );
    });
}

// Funcion para que cuando hagas click en una cuadrícula del tablero del enemigo se rellene por decirlo asi
canvas2.addEventListener("click", function (event) {
    const fila = Math.floor((event.clientX - canvas2.offsetLeft) / ancho_celda);
    const columna = Math.floor((event.clientY - canvas2.offsetTop) / altura_celda);

    // Verifica si el disparo de la máquina ha acertado en un barco o ha sido agua
    let agua = true;
    fetch("./Practica_final.json")
        .then((response) => {
            if (response.ok) return response.json();
            else {
                alert("No s'ha pogut completar la càrrega. Error " + response.status);
            }
        })
        .then((data) => {
            data.barcos.forEach((barco) => {
                barco.posicion.forEach((posicion) => {
                    if (posicion.fila === fila && posicion.columna === columna) {
                        if (barco.vidas > 0) {
                            barco.vidas--;
                            agua = false;
                            escribeLog("Tocado");
                            rellenoCelda(context2, columna, fila, "red", "X");
                            if (barco.vidas === 0) {
                                escribeLog("Tocado y hundido");
                            } else {
                                escribeLog("Tocado");
                            }
                        }
                    }
                });
            });

            if (agua) {
                escribeLog("Agua");
                rellenoCelda(context2, columna, fila, "blue", "A");
            }
        });
});

function escribeLog(texto) {
    var log = document.getElementById("texto");
    log.textContent = log.textContent + "\n" + texto;
}

function reiniciarCanvas() {
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    pintaCuadricula(context1);
    pintaCuadricula(context2);
    carga();
}
