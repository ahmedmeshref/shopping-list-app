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
    name_error: document.getElementById("updated-name-error"),
    update_item_btn: document.getElementById("update-item")
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


let updateItem = (newName, id) => {
    // check for the validation of the new name
    if (!app.updated_name.checkValidity()) {
        return;
    }

    fetch("/api/items", {
        method: "PATCH",
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            new_name: sanitize(newName)
        })
    })
        .then((response) => {
            if (response.ok) return response.json();
            throw Error(response.statusText);
        })
        .then((resObj) => {
            console.log(resObj);
            // TODO: Close the modal and update the name of the given element with its id and target element
        })
        .catch((err) => {
            print(err);
        })
}

let updateItemHandler = (targetEle) => {
    // Show update item model with current name inserted
    app.updated_name.value = targetEle.parentNode.querySelector("#name").innerText;
    // show modal with the current name
    $('#updateItem').modal('show');
    // fetch all elements for live verification
    getItems();
}

// I have no idea how to get the id of the clicked item.
app.update_item_btn.addEventListener('click', updateItem(app.updated_name.value, id));

// ------------------------------------------------------------------------------------------------------------------
// Detect Update or Delete item
// ------------------------------------------------------------------------------------------------------------------
let itemsClickHandler = (e) => {
    const target = e.target;
    // if the click target is check btn -> delete item. Otherwise, update item
    if (target.classList.contains("fa-check")) deleteItem(target, target.parentNode.dataset.id);
    else updateItemHandler(target, target.parentNode.dataset.id);
}

app.items_wrapper.addEventListener("click", itemsClickHandler);