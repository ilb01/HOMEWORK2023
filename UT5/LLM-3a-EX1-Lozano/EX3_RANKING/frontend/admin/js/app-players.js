import PlayerService from "./services/PlayerService.js";
import Loading from "./components/Loading.js";
import { scrollToHash } from "./util.js";
const listContainer = document.querySelector('#list-container');
const btnInsert = document.querySelector('#btn-insert');
const btnUpdate = document.querySelector('#btn-update');
const btnCancel = document.querySelector('#btn-cancel');
const messageAlert = document.querySelector('#message');
const form = document.querySelector('#frm-item');
const inputSearch = document.querySelector("#input-search");
const loadingObj = new Loading("modal-message", "Loading...");

let currentPlayer = null;

const newPlayer = () => {
    const nickname = document.querySelector('#field-nickname').value;
    const name = document.querySelector('#field-name').value;
    const surname = document.querySelector('#field-surname').value;
    const email = document.querySelector('#field-email').value;
    
    const player = {nickname, name, surname, email};
    console.log("player", player);
    loadingObj.open();
    PlayerService.insert(player).then(data => {
        console.log("message", data);
        renderPlayers();
        form.reset();
        scrollToHash("title-list");
    }).finally(() => {
        loadingObj.close();
    });
}

const editGame = (id) => {
    PlayerService.getItemById(id).then(data => {
        currentPlayer = data;
        document.querySelector('#field-nickname').value = data.nickname;
        document.querySelector('#field-name').value = data.name;
        document.querySelector('#field-surname').value = data.surname;
        document.querySelector('#field-email').value = data.email;
        //country
    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
    btnCancel.classList.replace("d-none", "d-inline");
    scrollToHash("title-form");
}

const updateGame = () => {
    const id = currentPlayer.id;
    const nickname = document.querySelector('#field-nickname').value;
    const name = document.querySelector('#field-name').value;
    const surname = document.querySelector('#field-surname').value;
    const email = document.querySelector('#field-email').value;
    const player = {id, nickname, name, surname, email};

    PlayerService.update(player).then(data => {
        currentPlayer = null;
        messageAlert.textContent = data.message;
        btnCancel.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-inline", "d-none");
        btnInsert.classList.replace("d-none", "d-inline");
        form.reset();
        renderPlayers();
    });

}

const deleteGame = (id) => {
    PlayerService.delete(id)
        .then(data => {
            messageAlert.textContent = data.message;
            renderPlayers();
        })
}

const populateGames = (items) => {
    items.forEach((e, i) => {
        listContainer.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${e.nickname}</td>
                <td>${e.name}</td>
                <td>${e.surname}</td>
                <td>${e.email}</td>
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
            deleteGame(id);
        })
    });

    // Buttons Edit
    const buttonsEdit = document.querySelectorAll('.btn-edit');
    buttonsEdit.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            editGame(id);
        })
    });
}

const renderPlayers = (searchValue) => {
    listContainer.innerHTML = "";
    if (searchValue) {
        loadingObj.open();
        PlayerService.searchItemByName(searchValue)
            .then(items => {
                if (items.length===0){
                    listContainer.innerHTML = "<tr><td colspan='4'>No items found<td></tr>";
                }else{
                    populateGames(items);
                }
            }).finally(() => {
                loadingObj.close();
            });
    } else {
        loadingObj.open();
        PlayerService.getItemsList()
            .then(items => {
                populateGames(items);
            }).finally(() => {
                loadingObj.close();
            });
    }
}
const validateForm = (event) => {
    event.preventDefault();
    //Execute insert or update depends to button name 
    if (event.target.id === "btn-insert") {
        newPlayer();
    } else if (event.target.id === "btn-update") {
        updateGame();
    }else{
        console.log("id button not found in validateForm function");
    }
}

const searchPlayer = (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 3) {
        let nameSearch = input.value.toLowerCase();
        renderPlayers(nameSearch);
    } else if (input.value.length == 0) {
        renderPlayers();
    }
}

function init() {
    renderPlayers();
    btnCancel.addEventListener("click", function (e) {
        currentPlayer = null;
        messageAlert.textContent = "";
        btnCancel.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-inline", "d-none");
        btnInsert.classList.replace("d-none", "d-inline");
        form.reset();
    });

    inputSearch.addEventListener("keyup", searchPlayer);
    btnInsert.addEventListener("click", validateForm);
    btnUpdate.addEventListener("click", validateForm);
    // Reiniciamos el formulario por si hay datos precargados
    form.reset();
}

init();