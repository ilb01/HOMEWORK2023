// PARA IMPORTAR UNA CLASE (./book.js --> directorio actual)
import { book } from "./Book.js";
import { Author } from "./Author.js";
const authorsHarryPotter=[
    new Author (1, "Pepa" , "Martinez", "", 1930)
]
// para hacer una array con la clase de book
const booksList = [
    new book("12345232", "Harry Potter", authorsHarryPotter,  2009, 10.92),
    new book("12345232", "Harry Potter 2", authorsHarryPotter, 2010, 11.64),
    new book("12345232", "Harry Potter 3", authorsHarryPotter,  2011, 12.24),
    new book("12345232", "Harry Potter 4", authorsHarryPotter,  2012, 13.65),
]
console.log(booksList);
// para imprimir clase en html
const comicContainer = document.querySelector('#comic-container');
// Imprimir el render de class en javascript
// comicContainer.innerHTML = book1.render();
// console.log("Nombre: ", book1.title);
// para recorrer la array
booksList.forEach(book => {
    comicContainer.innerHTML += book.render();
});

