import {
    print,
    sanitize,
    buildItem,
    clickBtn,
    getItems,
    verifyItemName
} from "./utils.js"


const app = {
    items_wrapper: document.getElementById("table-body"),
    updated_name: document.getElementById("updated-name"),
    name_error: document.getElementById("updated-name-error")
}


// ------------------------------------------------------------------------------------------------------------------
// Live verification of new item's name
// ------------------------------------------------------------------------------------------------------------------
app.updated_name.addEventListener('keyup', _ => {
    console.log(app.updated_name.value)
    verifyItemName(app.updated_name, app.name_error);
});

let removeElementFromScreen = (element) => {
    try {
        app.items_wrapper.removeChild(element);
        print("Deleted Successfully!");
    } catch {
        alert("Error Happened!");
    }
}

let deleteItem = (target, id) => {
    fetch("/api/items", {
        method: "DELETE",
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then((response) => {
            if (response.ok) return response.json();
            throw Error(response.statusText);
        })
        .then((resVal) => {
            removeElementFromScreen(target.parentNode);
        })
        .catch((err) => {
            alert(err);
        })
}


let updateItem = (target, id) => {
    // Show update item model with current name inserted
    app.updated_name.value = target.parentNode.querySelector("#name").innerText;
    $('#updateItem').modal('show');
    getItems();
}


let itemsClickHandler = (e) => {
    const target = e.target;
    console.log(target);
    // if the click target is check btn -> delete item. Otherwise, update item
    if (target.classList.contains("fa-check")) deleteItem(target, target.parentNode.dataset.id);
    else updateItem(target, target.parentNode.dataset.id);
}

app.items_wrapper.addEventListener("click", itemsClickHandler);