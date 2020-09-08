import {
    print,
    sanitize,
    buildItem,
    clickBtn,
    getItems,
    verifyItemName
} from "./utils.js"

const app = {
    add_item_btn: document.getElementById("new-item"),
    add_item_form: document.getElementById("add-item-form"),
    item_name: document.getElementById("item-name"),
    items_wrapper: document.querySelector(".table-body"),
    close_model: document.getElementById("close-model"),
}

// ------------------------------------------------------------------------------------------------------------------
// Get existing items from db once "Add New Item" button is clicked
// ------------------------------------------------------------------------------------------------------------------
app.add_item_btn.addEventListener('click', () => {
    getItems();
});


// ------------------------------------------------------------------------------------------------------------------
// Live verification of new item's name
// ------------------------------------------------------------------------------------------------------------------
app.item_name.addEventListener('keyup', _ => {
    verifyItemName(app.item_name.value);
});


// ------------------------------------------------------------------------------------------------------------------
// add new item
// ------------------------------------------------------------------------------------------------------------------
let addItemToScreen = (itemId, name) => {
    // give id to the new added item
    const listId = +app.items_wrapper.childElementCount + 1;
    const li_content = `
    <span class="id-column">${listId}</span>
    <span class="name-column">${sanitize(name)}</span>
    <span class="fa fa-check" data-id=${itemId}>&#10003;</span>
    `
    const li = buildItem('LI', li_content);
    app.items_wrapper.appendChild(li);
}

let addNewItem = (e) => {
    e.preventDefault();
    // check that the new item's name is valid.
    if (!app.item_name.checkValidity()) {
        return;
    }
    const newItemName = sanitize(app.item_name.value);
    fetch('/api/items', {
        method: 'POST',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            name: newItemName
        })
    })
        .then((response) => {
            if (response.ok) return response.json();
            throw Error(response.statusText);
        })
        .then((resObj) => {
            // close the modal
            clickBtn(app.close_model);
            // add new item to items list
            addItemToScreen(resObj._id, resObj.name);
        })
        .catch((err) => {
            print(err);
        })
}

// submit form if and only if, new item's name is verified.
app.add_item_form.addEventListener('submit', addNewItem);




