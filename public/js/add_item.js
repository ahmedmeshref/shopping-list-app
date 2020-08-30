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

let postData = async (url, data) => {
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
    return response.json();
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
let verifyName = () => {
    const newItemName = sanitize(app.item_name.value);
    if (!newItemName) return;
    let nameValid = true;
    // format the new item name to match the format of the elements in db.
    const formattedName = formatName(newItemName);
    // compare new item's name to existing items in db.
    app.existing_items.forEach((item) => {
        if (item.name === formattedName) {
            setInputValidity(app.item_name, "invalid");
            // show error message, item already exists.
            showElement(app.name_exist_error);
            nameValid = false;
        }
    })
    if (nameValid){
        // make field valid, if new item's name doesn't exist in db.
        setInputValidity(app.item_name, "");
        hideElement(app.name_exist_error);
    }
}

app.item_name.addEventListener('keyup', verifyName);


// ------------------------------------------------------------------------------------------------------------------
// add new item
// ------------------------------------------------------------------------------------------------------------------
let addItemToScreen = (name) => {
    // give id to the new added item
    const id = +app.items_wrapper.lastElementChild.firstElementChild.innerHTML + 1 || 0;
    const li_content = `
    <span class="id-column">${id}</span>
    <span class="name-column">${sanitize(name)}</span>
    `
    const li = buildItem('LI', li_content);
    app.items_wrapper.appendChild(li);
    // close the modal
    clickBtn(app.close_model);
}

let addNewItem = (e) => {
    e.preventDefault();
    const newItemName = sanitize(app.item_name.value);
    postData('/list', {
        name: newItemName
    })
        .then((resObj) => {
            addItemToScreen(resObj.name);
        })
        .catch((err) => {
            print(err);
        })
}

// if (app.item_name.checkValidity()){
//     // submit form if and only if, new item's name is verified.
//     app.add_item_form.addEventListener('submit', addNewItem);
// }



