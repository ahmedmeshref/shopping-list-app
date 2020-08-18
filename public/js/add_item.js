const app = {
    add_item_form: document.getElementById("add-item-form"),
    item_name: document.getElementById("item-name"),
    items_wrapper: document.querySelector(".table-body"),
    close_model: document.getElementById("close-model")
}

let print = (msg) => {
    console.log(msg);
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

let buildItem = (tag, content, className) => {
    let new_item = document.createElement(tag);
    new_item.innerHTML = content;
    new_item.classList.add(className);
    return new_item;
}

let clickBtn = (btn) => {
    btn.click();
}

let addItemToScreen = (name) => {
    // give id to the new added item
    const id = +app.items_wrapper.lastElementChild.firstElementChild.innerHTML + 1 || 0;
    const li_content = `
    <span class="id-column">${id}</span>
    <span class="name-column">${name}</span>
    `
    const li = buildItem('LI', li_content);
    app.items_wrapper.appendChild(li);
    // close the modal
    clickBtn(app.close_model);
}

let addNewItem = (e) => {
    e.preventDefault();
    const name = app.item_name.value;
    postData('/list', {
        name: name
    })
        .then((resObj) => {
            addItemToScreen(resObj.name);
        })
        .catch((err) => {
            print(err);
        })
}

app.add_item_form.addEventListener('submit', addNewItem)