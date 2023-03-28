import ArticlesService from "./ArticleService.js";
const listContainer = document.querySelector('#list-container');

const renderArticles = () =>{
    ArticlesService.getItemsList().then(articles=>{

        listContainer.innerHTML="";
        // Mostramos los datos de los articulos en filas de la tabla
        articles.forEach((e,index) => {  // el foreach nos puede proporcinar dos elementos el e que le damos nostros y un index.
            listContainer.innerHTML+=`
                <tr>
                    <td>${index+1}</td>
                    <td>${e.name}</td>
                    <td>${e.price}</td>
                    <td>${e.stock}</td>
                    <td>${e.description}</td>
                    <td>
                        <button class="btn-warning">Delete</button>
                        <button class="btn-info">Edit</button>
                    </td>
                </tr>
            `
        });
    })
}

function init() {
renderArticles();
}

init();