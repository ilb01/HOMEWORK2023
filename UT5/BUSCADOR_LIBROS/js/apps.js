const btnBuscador = document.querySelector("#submit-buscador");
let librosJSON = [];

// METODO MÁS FACIL PARA IMPRIMIR EL JSON
window.onload = async () => {
  const respuesta = await fetch('./data/libros.json');
  librosJSON = await respuesta.json(); 
  const peli = await fetch ('./data/pelicula.json');
  peliJSON = await peli.json();
  // Para pintar el json 
  pintarLibros(librosJSON);
  pintarPeli(peliJSON);
}

function pintarLibros(listaLibros) {
    let content = document.querySelector("#list-content");
    content.innerHTML = "";
    let autores = librosJSON.find(e => e.writers.name == "Jorge"  );
    listaLibros.forEach((libros) => {
      // PARA COGER LA ARRAY DE JSON
      let htmlWriters = "";
        libros.writers.forEach(writer => {
          htmlWriters = `${writer.name} ${writer.surname}  `
        })
        
        let htmlLibros = `
        <tr>
            <th scope="row">${libros.id}</th>
            <td>${libros.title}</td>
            <td>${htmlWriters}</td>
            <td>${libros.yearRelease}</td>
            <td>${libros.price}</td>
          </tr>
      `;
        content.innerHTML += htmlLibros;
    });
}

function pintarPeli(listaPeli) {
  let content = document.querySelector("#list-content-pelicula");
    content.innerHTML = "";
    listaPeli.forEach((pelicula) => {
        
        let htmlPeli = `
        <tr>
            <th scope="row">${pelicula.id}</th>
            <td>${pelicula.title}</td>
            <td>No hay director</td>
            <td>${pelicula.yearRelease}</td>
            <td>${pelicula.price}</td>
          </tr>
      `;
        content.innerHTML += htmlPeli;
    });
}
