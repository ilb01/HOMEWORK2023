import ArticlesService from "./ArticleService.js";
const listContainer = document.querySelector("#list-container");
const form = document.querySelector("#frm-article");
const messageAlert = document.querySelector("#message");
const inputSearch = document.querySelector('#input-search');
let currentArticle = null;

const populateArticles = (articles)=>{
    listContainer.innerHTML = "";
        // Mostramos los datos de los articulos en filas de la tabla
        articles.forEach((e, index) => {
            // el foreach nos puede proporcinar dos elementos el e que le damos nostros y un index.
            listContainer.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${e.name}</td>
                    <td>${e.price}</td>
                    <td>${e.stock}</td>
                    <td>${e.description}</td>
                    <td>
                        <button id="btn-delete-${e.id}" class="btn btn-warning btn-delete">Delete</button>
                        <button id="btn-edit-${e.id}" class="btn btn-info btn-edit">Edit</button>
                    </td>
                </tr>

            `;
        });

        //handle delete buttons
        const deleteButtons = document.querySelectorAll(".btn-delete");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function (e) {
                const idArticle = e.target.id.split("-")[2]; // con esto recuperamos el id del articulo que se encuentra en el id del boton
                deleteArticle(idArticle);
            });
        });

        //handle edit buttons
        const editButtons = document.querySelectorAll(".btn-edit");
        editButtons.forEach(button => {
            button.addEventListener("click", function (e) {
                const idArticle = e.target.id.split("-")[2]; // con esto recuperamos el id del articulo que se encuentra en el id del boton
                editArticle(idArticle);
            });
        });
}
const renderArticles = () => {
    ArticlesService.getItemsList().then((articles) => {
        populateArticles(articles)
    });
};

const btnInsert = document.querySelector("#btn-insert");
const btnUpdate = document.querySelector("#btn-update");

const newArticle = (event) => {
    event.preventDefault(); //evita que se envien los datos de un submit y no refreque la pagina.
    const name = document.querySelector("#field-name").value;
    const price = document.querySelector("#field-price").value;
    const stock = document.querySelector("#field-stock").value;
    const description = document.querySelector("#field-description").value;

    const item = { name, price, stock, description }; //"name":name; es lo mismo que name
    ArticlesService.insert(item).then((data) => {
        renderArticles();
        form.reset();
        messageAlert.textContent = data.message;
    });
};

const deleteArticle = (id) => {
    ArticlesService.delete(id).then((data) => {
        renderArticles();
        messageAlert.textContent = `Article ${data.name} deleted`;
    });
};
const editArticle = (id) => {
    ArticlesService.getItemById(id).then((data) => {
        currentArticle = data;
        document.querySelector("#field-name").value = data.name;
        document.querySelector("#field-price").value = data.price;
        document.querySelector("#field-stock").value = data.stock;
        document.querySelector("#field-description").value = data.description;

        // Cambio de estado de los botones
        btnInsert.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-none", "d-inline");
        messageAlert.textContent = `Article ${data.name} loaded`;
    });

};
const updateArticle = (event) => {
    event.preventDefault();
    // Recuperar los datos del formulario
    const id = currentArticle.id;
    const name = document.querySelector("#field-name").value;
    const price = document.querySelector("#field-price").value;
    const stock = document.querySelector("#field-stock").value;
    const description = document.querySelector("#field-description").value;

    const item = {id, name, price, stock, description }; //"name":name; es lo mismo que name


    // Enviar datos a la API para que se modifique el articulo
    ArticlesService.update(item).then((data) => {
        renderArticles();
        form.reset();
        // Cambio de estado de los botones
        btnInsert.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-none", "d-inline");
        messageAlert.textContent = `Article ${data.name} updated`;
    })
};

const searchArticles = (name)=>{
    ArticlesService.searchItemByName(name).then(list=>{
        populateArticles(list);
    });
}

function init() {
    renderArticles();
    btnInsert.addEventListener("click", newArticle);
    btnUpdate.addEventListener("click", updateArticle);
    inputSearch.addEventListener("keyup", function (event){
        let searchInput = event.target.value;
        if (searchInput.length>=3) {
            searchArticles(searchInput);   
        }
        else if(searchArticles===0){
            renderArticles();
        }
    } )
}

init();
