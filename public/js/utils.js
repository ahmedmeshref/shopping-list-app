const app = {
    item_name: document.getElementById("item-name"),
    name_exist_error: document.getElementById("item-name-error"),
    existing_items: []
};

export let print = (msg) => {
    console.log(msg);
}

export let sanitize = (string) => {
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

export let buildItem = (tag, content, className) => {
    let new_item = document.createElement(tag);
    new_item.innerHTML = content;
    new_item.classList.add(className);
    return new_item;
}

export let clickBtn = (btn) => {
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


export let getItems = () => {
    fetch("/api/items", {
        method: 'GET',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((items) => {
            app.existing_items = items.items;
        })
        .catch((err) => {
            print(err);
        })
}

let isUnique = (collection, newItem) => {
    for (const item of collection) {
        if (item.name === newItem) {
            return false;
        }
    }
    return true;
}

export let verifyItemName = (item_name) => {
    const newItemName = sanitize(item_name);
    if (!newItemName) return;
    // format the new item name to match the format of the elements in db.
    const formattedItemName = formatName(newItemName);
    // check if new item's name is unique compared to existing items.
    if (isUnique(app.existing_items, formattedItemName)) {
        // if new item's name is unique, make the input field valid.
        setInputValidity(app.item_name, "");
        hideElement(app.name_exist_error);
    } else {
        setInputValidity(app.item_name, "invalid");
        // show error message, item already exists.
        showElement(app.name_exist_error);
    }
}