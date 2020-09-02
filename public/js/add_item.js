const app = {
    add_item_btn: document.getElementById("new-item"),
    add_item_form: document.getElementById("add-item-form"),
    item_name: document.getElementById("item-name"),
    items_wrapper: document.querySelector(".table-body"),
    close_model: document.getElementById("close-model"),
    name_exist_error: document.getElementById("item-name-error"),
    existing_items: []
}

// ------------------------------------------------------------------------------------------------------------------
// utils
// ------------------------------------------------------------------------------------------------------------------

let print = (msg) => {
    console.log(msg);
}

let sanitize = (string) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}

let getData = async (url) => {
    let response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}

let buildItem = (tag, content, className) => {
    let new_item = document.createElement(tag);
    new_item.innerHTML = content;
    new_item.classList.add(className);
    return new_item;
}

let clickBtn = (btn) => {
    btn.click();
}

let formatName = (name) => {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

let setInputValidity = (inputField, validity) => {
    inputField.setCustomValidity(validity);
}

let showElement = (textEle) => {
    textEle.classList.remove('hidden');
}

let hideElement = (textEle) => {
    textEle.classList.add('hidden');
}

// ------------------------------------------------------------------------------------------------------------------
// Get existing items from db once "Add New Item" button is clicked
// ------------------------------------------------------------------------------------------------------------------
let getItems = () => {
    getData('/api/items')
        .then((itemsObj) => {
            app.existing_items = itemsObj.items;
            console.log("Items fetched from db");
        })
        .catch((err) => {
            console.log(err);
        })
}

app.add_item_btn.addEventListener('click', getItems);


// ------------------------------------------------------------------------------------------------------------------
// Live verification of new item's name
// ------------------------------------------------------------------------------------------------------------------
let isUnique = (collection, newItem) => {
    for (const item of collection) {
        if (item.name === newItem) {
            setInputValidity(app.item_name, "invalid");
            // show error message, item already exists.
            showElement(app.name_exist_error);
            return false;
        }
    }
    return true;
}

let verifyName = () => {
    const newItemName = sanitize(app.item_name.value);
    if (!newItemName) return;
    let nameValid = true;
    // format the new item name to match the format of the elements in db.
    const formattedItemName = formatName(newItemName);
    // check if new item's name is unique compared to existing items.
    if (isUnique(app.existing_items, formattedItemName)){
        // if new item's name is unique, make the input field valid.
        setInputValidity(app.item_name, "");
        hideElement(app.name_exist_error);
    }
}

app.item_name.addEventListener('keyup', verifyName);


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
        return
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
            alert(err);
        })
}

// submit form if and only if, new item's name is verified.
app.add_item_form.addEventListener('submit', addNewItem);




