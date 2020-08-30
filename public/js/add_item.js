const app = {
    add_item_btn: document.getElementById("new-item"),
    add_item_form: document.getElementById("add-item-form"),
    item_name: document.getElementById("item-name"),
    items_wrapper: document.querySelector(".table-body"),
    close_model: document.getElementById("close-model"),
    name_exist_error: document.getElementById("item-name-error");
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

let getSanitizedName = () => {
    return sanitize(app.item_name.value)
}

let makeInputInvalid = (inputField) => {
    inputField.setCustomValidity("invalid");
}

let showText = (textEle) => {
    textEle.classList.remove('hidden');
}

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
    const newItemName = getSanitizedName();
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

app.add_item_form.addEventListener('submit', addNewItem);

// ------------------------------------------------------------------------------------------------------------------
// Get db existing items
// ------------------------------------------------------------------------------------------------------------------
let verified = true;

let getAllItems = () => {
    getData('/api/items')
        .then((itemsObj) => {
            app.existing_items = itemsObj.items;
            console.log("All items fetched from db");
        })
        .catch((err) => {
            console.log(err);
        })
}

app.add_item_btn.addEventListener('click', getAllItems);

// ------------------------------------------------------------------------------------------------------------------
// Live verification of new item's name
// ------------------------------------------------------------------------------------------------------------------
let verifyName = () => {
    const newItemName = getSanitizedName();
    if (newItemName){
        const formattedName = newItemName[0].toUpperCase() + newItemName.slice(1).toLowerCase();
        app.existing_items.forEach((item) => {
            if (item.name === formattedName) {
                makeInputInvalid(app.item_name);
                showText(app.name_exist_error);
            }
        })
    }
}

app.item_name.addEventListener('keyup', verifyName);


