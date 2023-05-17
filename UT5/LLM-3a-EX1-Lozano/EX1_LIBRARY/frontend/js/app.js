import BookService from "./BookService.js";
const Container = document.querySelector('#list-container');
const inputSearch = document.querySelector('#input-search');


const populateContainer = (items) => {
    Container.innerHTML="";
    items.forEach((e, i) => {
        let template = `
                <tr>
                <th scope="row">${i + 1}</th>
                <td>${e.isbn}</td>
                <td>${e.title}</td>
                <td>${e.year}</td>
                <td>${e.description}</td>
                </tr>
        `;
        Container.innerHTML += template;
    });
}

async function renderBooks() {
    BookService.getItemsList().then((articles) => {
        populateContainer(articles);
    })
}

const searchBooks = (title) => {
    BookService.searchItemByName(title).then(list => {
        populateContainer(list);
    });
}
function init() {
    renderBooks();
    inputSearch.addEventListener("keyup", function (event) {
        let searchInput = event.target.value;
        if (searchInput.length >= 3) {
            searchBooks(searchInput);
        }
        else if (searchBooks === 0) {
            renderBooks();
        }
    })
}
init();