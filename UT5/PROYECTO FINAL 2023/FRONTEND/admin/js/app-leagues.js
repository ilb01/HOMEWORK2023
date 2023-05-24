import LeagueService from "./services/LeagueService.js";
import Loading from "./components/Loading.js";
import { scrollToHash } from "./util.js";
const listContainer = document.querySelector('#list-container');
const btnInsert = document.querySelector('#btn-insert');
const btnUpdate = document.querySelector('#btn-update');
const btnCancel = document.querySelector('#btn-cancel');
const messageAlert = document.querySelector('#message');
const form = document.querySelector('#frm-item');
const inputSearch = document.querySelector("#input-search");
const loadingObj = new Loading("modal-message", "Loading...")

let currentLeague = null;

const newLeague = () => {
    const name = document.querySelector('#field-name').value;
    const country = document.querySelector('#field-country').value;
    const league = { name, country };
    console.log("league", league);
    loadingObj.open();
    LeagueService.insert(league).then(data => {
        console.log("message", data);
        renderLeagues();
        form.reset();
        scrollToHash("title-list");
    }).finally(() => {
        loadingObj.close();
    });
}

const editLeague = (id) => {
    LeagueService.getItemById(id).then(data => {
        currentLeague = data;
        document.querySelector('#field-name').value = data.name;
        document.querySelector('#field-country').value = data.country;
    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
    btnCancel.classList.replace("d-none", "d-inline");
    scrollToHash("title-form");
}

const updateLeague = () => {
    const id = currentLeague.id;
    const name = document.querySelector('#field-name').value;
    const country = document.querySelector('#field-country').value;
    const league = { id, name, country }

    LeagueService.update(league).then(data => {
        currentLeague = null;
        messageAlert.textContent = data.message;
        btnCancel.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-inline", "d-none");
        btnInsert.classList.replace("d-none", "d-inline");
        form.reset();
        renderLeagues();
    });

}

const deleteLeague = (id) => {
    LeagueService.delete(id)
        .then(data => {
            messageAlert.textContent = data.message;
            //Change state
            renderLeagues();
        })
}

const populateLeagues = (items) => {
    items.forEach((e, i) => {
        listContainer.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${e.name}</td>
                <td>${e.country}</td> 
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
            deleteLeague(id);
        })
    });

    // Buttons Edit
    const buttonsEdit = document.querySelectorAll('.btn-edit');
    buttonsEdit.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            editLeague(id);
        })
    });
}

const renderLeagues = (searchValue) => {
    listContainer.innerHTML = "";
    if (searchValue) {
        loadingObj.open();
        LeagueService.searchItemByName(searchValue)
            .then(items => {
                if (items.length === 0) {
                    listContainer.innerHTML = "<tr><td colspan='3'>No items found<td></tr>";
                } else {
                    populateLeagues(items);
                }

            }).finally(() => {
                loadingObj.close();
            });
    } else {
        loadingObj.open();
        LeagueService.getItemsList()
            .then(items => {
                populateLeagues(items);
            }).finally(() => {
                loadingObj.close();
            });
    }
}
const validateForm = (event) => {
    event.preventDefault();
    //Execute insert or update depends to button name 
    if (event.target.id === "btn-insert") {
        newLeague();
    } else if (event.target.id === "btn-update") {
        updateLeague();
    } else {
        console.log("id button not found in validateForm function");
    }
}

const searchLeague = (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 3) {
        let nameSearch = input.value.toLowerCase();
        renderLeagues(nameSearch);
    } else if (input.value.length == 0) {
        renderLeagues();
    }
}

function init() {
    renderLeagues();
    btnCancel.addEventListener("click", function (e) {
        currentLeague = null;
        messageAlert.textContent = "";
        btnCancel.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-inline", "d-none");
        btnInsert.classList.replace("d-none", "d-inline");
        form.reset();
    });

    inputSearch.addEventListener("keyup", searchLeague);
    btnInsert.addEventListener("click", validateForm);
    btnUpdate.addEventListener("click", validateForm);
    // Reiniciamos el formulario por si hay datos precargados
    form.reset();
}

init();