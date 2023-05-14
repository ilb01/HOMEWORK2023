import ArticlesService from "./ArticleService.js";
const Container = document.querySelector('#list-container');
const inputSearch = document.querySelector('#input-search');


function populateContainer(articles) {
    Container.innerHTML = "";
    articles.forEach((e, index) => {
        Container.innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <p class="card-text">${index + 1}</p>
                <h5 class="card-title">${e.name}</h5>
                <p class="card-text">${e.description}</p>
                <p class="card-text">${e.price}</p>
                <a href="#" id="btn-comprar-${e.id}" class="btn btn-primary">COMPRAR</a>
            </div>
        </div>
        `
    });
}

function renderArticles() {
    ArticlesService.getItemsList().then((articles) => {
        populateContainer(articles);
    })
}

const searchArticles = (name) => {
    ArticlesService.searchItemByName(name).then(list => {
        populateArticles(list);
    });
}
function init() {
    renderArticles();
    inputSearch.addEventListener("keyup", function (event) {
        let searchInput = event.target.value;
        if (searchInput.length >= 3) {
            searchArticles(searchInput);
        }
        else if (searchArticles === 0) {
            renderArticles();
        }
    })
}
init();