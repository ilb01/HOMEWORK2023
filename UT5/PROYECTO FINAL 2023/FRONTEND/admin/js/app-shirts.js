import ShirtService from "./services/ShirtService.js";
import LeagueService from "./services/LeagueService.js";
import Loading from "./components/Loading.js";
const loadingObj = new Loading("modal-message", "Loading...");import { scrollToHash } from "./util.js";
const listContainer = document.querySelector('#list-container');
const selectLeague = document.querySelector('#field-league');
const btnInsert = document.querySelector('#btn-insert');
const btnUpdate = document.querySelector('#btn-update');
const btnCancel = document.querySelector('#btn-cancel');
const messageAlert = document.querySelector('#message');
const form = document.querySelector('#frm-item');
const inputSearch = document.querySelector("#input-search");

let currentShirt = null;

const newShirt = () => {
    const name = document.querySelector('#field-name').value;
    const team = document.querySelector('#field-team').value;
    const price = document.querySelector('#field-price').value;
    const league = document.querySelector("#field-league").value;
    const shirt = {name, team, price, league };
    console.log("shirt", shirt);
    loadingObj.open();
    ShirtService.insert(shirt).then(data => {
        console.log("message", data);
        renderShirts();
        form.reset();
        scrollToHash("title-list");
    }).finally(() => {
        loadingObj.close();
    });
}

const editShirt = (id) => {
    ShirtService.getItemById(id).then(data => {
        currentShirt = data;
        document.querySelector('#field-name').value = data.name;
        document.querySelector('#field-team').value = data.team;
        let option =document.querySelector(`#field-league option[value*='${data.league}']`);
        if(option) option.selected=true;
        document.querySelector('#field-price').value = data.price;
        //country
    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
    btnCancel.classList.replace("d-none", "d-inline");
    scrollToHash("title-form");
}

const updateShirt = () => {
    const id = currentShirt.id;
    const name = document.querySelector('#field-name').value;
    const team = document.querySelector('#field-team').value;
    const price = document.querySelector('#field-price').value;
    const league = document.querySelector("#field-league").value;
    const shirt = {id, name, team, league, price };

    ShirtService.update(shirt).then(data => {
        currentShirt = null;
        messageAlert.textContent = data.message;
        btnCancel.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-inline", "d-none");
        btnInsert.classList.replace("d-none", "d-inline");
        form.reset();
        renderShirts();
    });

}

const deleteShirt = (id) => {
    ShirtService.delete(id)
        .then(data => {
            messageAlert.textContent = data.message;
            //Change state
            renderShirts();
        })
}

const populateShirts = (items) => {
    items.forEach((e, i) => {
        listContainer.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${e.name}</td>
                <td>${e.team}</td>
                <td>${e.league.name}</td>
                <td>${e.price}</td>
                <td class="text-center">
                    <button id="btn-delete-${e.id}" class="btn btn-danger btn-delete">Delete</button>
                    <button id="btn-edit-${e.id}" class="btn btn-info btn-edit" >Edit</button>
                </td>
            </tr>
        `;
    });

    // Buttons delete
    const buttonsDelete = document.querySelectorAll('.btn-delete');
    buttonsDelete.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            deleteShirt(id);
        })
    });

    // Buttons Edit
    const buttonsEdit = document.querySelectorAll('.btn-edit');
    buttonsEdit.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            editShirt(id);
        })
    });
}

const renderShirts = (searchValue) => {
    listContainer.innerHTML = "";
    if (searchValue) {
        loadingObj.open();
        ShirtService.searchItemByName(searchValue)
            .then(items => {
                populateShirts(items);
            }).finally(() => {
                loadingObj.close();
            });
    } else {
        loadingObj.open();
        ShirtService.getItemsList()
            .then(items => {
                populateShirts(items);
            }).finally(() => {
                loadingObj.close();
            });
    }
}
const validateForm = (event) => {
    event.preventDefault();
    // Validate each field
    //Execute insert or update depends to button name 
    if (event.target.id === "btn-insert") {
        newShirt();
    } else if (event.target.id === "btn-update") {
        updateShirt();
    }else{
        console.log("id button not found in validateForm function");
    }
}

const searchShirt = (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 3) {
        let nameSearch = input.value.toLowerCase();
        renderShirts(nameSearch);
    } else if (input.value.length == 0) {
        renderShirts();
    }
}

const renderLeaguesSelect = () => {
    selectLeague.innerHTML = "";
    loadingObj.open();
    LeagueService.getItemsList()
        .then(items => {
            items.forEach(cat => {
                selectLeague.innerHTML+=`
                    <option value="${cat.id}">${cat.name}</option>
                `;
            });
            
        }).finally(() => {
            loadingObj.close();
        });
    
}

function init() {
    renderShirts();
    btnCancel.addEventListener("click", function (e) {
        currentShirt = null;
        messageAlert.textContent = "";
        btnCancel.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-inline", "d-none");
        btnInsert.classList.replace("d-none", "d-inline");
        form.reset();
    });

    inputSearch.addEventListener("keyup", searchShirt);
    btnInsert.addEventListener("click", validateForm);
    btnUpdate.addEventListener("click", validateForm);
    // Reiniciamos el formulario por si hay datos precargados
    form.reset();

    renderLeaguesSelect();

}

init();