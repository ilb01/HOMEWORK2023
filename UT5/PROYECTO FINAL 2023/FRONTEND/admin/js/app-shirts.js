import ShirtsService from "./services/ShirtService.js";
import { scrollToHash } from "./util.js";
import Loading from "./components/Loading.js";
const loadingObj = new Loading("modal-message", "Loading...");
const listContainer = document.querySelector('#list-container');
const btnInsert = document.querySelector('#btn-insert');
const btnUpdate = document.querySelector('#btn-update');
const btnCancel = document.querySelector('#btn-cancel');
const messageAlert = document.querySelector('#message');
const form = document.querySelector('#frm-item');
const inputSearch = document.querySelector("#input-search");
// const inputName = document.querySelector('#field-name');
// const inputPrice = document.querySelector('#field-price');
// const inputTeam = document.querySelector('#field-team');

let currentShirt = null;

const newShirt = () => {
    const img = document.querySelector('#field-img').value;
    const name = document.querySelector('#field-name').value;
    const team = document.querySelector('#field-team').value;
    const price = document.querySelector('#field-price').value;

    
    const shirt = {img, name, team, price};
    console.log("shirt", shirt);
    loadingObj.open();
    ShirtsService.insert(shirt).then(data => {
        console.log("message", data);
        renderShirts();
        form.reset();
        scrollToHash("title-list");
    }).finally(() => {
        loadingObj.close();
    });
}

const editShirt = (id) => {
    ShirtsService.getItemById(id).then(data => {
        currentShirt = data;
        document.querySelector('#field-img').value = currentShirt.img;
        document.querySelector('#field-name').value = currentShirt.name;
        document.querySelector('#field-team').value = currentShirt.team;
        document.querySelector('#field-price').value = currentShirt.price;
    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
    btnCancel.classList.replace("d-none", "d-inline");
    scrollToHash("title-form");
}

const updateShirt = () => {
    const id = currentShirt.id;
    const img = document.querySelector('#field-img').value;
    const name = document.querySelector('#field-name').value;
    const team = document.querySelector('#field-team').value;
    const price = document.querySelector('#field-price').value;
    const shirt = {id, img, name, team, price};

    ShirtsService.update(shirt).then(data => {
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
    ShirtsService.delete(id)
        .then(data => {
            messageAlert.textContent = data.message;
            //Change state
            renderShirts();
        })
}

const populateShirts = (items) => {
    Array.from(items).forEach((e, i) => {
        listContainer.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${e.img}</td>
                <td>${e.name}</td>
                <td>${e.team}</td>
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
        ShirtsService.searchItemByName(searchValue)
            .then(items => {
                populateShirts(items);
            }).finally(() => {
                loadingObj.close();
            });
    } else {
        loadingObj.open();
        ShirtsService.getItemsList()
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
    // if(!inputName.validity.valid) {
    //     alert("Nombre no válido");
    //     inputName.focus();
    //     return false;
    // }
    // if(!inputTeam.validity.valid) {
    //     alert("Equipo no válido");
    //     inputTeam.focus();
    //     return false;
    // }
    // if(!inputPrice.validity.valid) {
    //     alert("Precio incorrecto");
    //     inputPrice.focus();
    //     return false;
    // }
    
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
}

init();