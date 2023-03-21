// PARA IMPORTAR UNA CLASE (./book.js --> directorio actual)
import { book } from "./book.js";

// para hacer una array con la clase de book
const booksList = [
    new book("12345232", "Harry Potter", "Pepa",  2009, 10, 90),
    new book("12345232", "Harry Potter 2", "Pepa", 2010, 11, 90),
    new book("12345232", "Harry Potter 3", "Pepa",  2011, 12, 90),
    new book("12345232", "Harry Potter 4", "Pepa",  2012, 13, 90),
]

// para imprimir clase en html
const comicContainer = document.querySelector('#comic-container');
// Imprimir el render de class en javascript
// comicContainer.innerHTML = book1.render();
// console.log("Nombre: ", book1.title);
// para recorrer la array
booksList.forEach(book => {
    comicContainer.innerHTML += book.render();
});

