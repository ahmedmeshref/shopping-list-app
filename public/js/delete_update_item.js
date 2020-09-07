const keys = {
    items_wrapper: document.getElementById("table-body")
}


let removeElementFromScreen = (element) => {
    try {
        keys.items_wrapper.removeChild(element);
        console.log("Deleted Successfully!");
    } catch {
        alert("Error Happened!");
    }
}

let deleteItem = (id) => {
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
            removeElementFromScreen(e.target.parentNode);
        })
        .catch((err) => {
            alert(err);
        })
}


let updateItem = (id) => {
    
}

let itemsClickHandler = (e) => {
    const target = e.target;
    console.log(target);
    // if the click target is check btn -> delete item. Otherwise, update item
    if (!target.classList.contains("fa-check")) deleteItem(target.parentNode.dataset.id);
    else updateItem(target.parentNode.dataset.id);
}

keys.items_wrapper.addEventListener("click", itemsClickHandler);