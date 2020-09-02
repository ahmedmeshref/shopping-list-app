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

let deleteItem = (e) => {
    const target = e.target
    // verify the click target to be the check btn
    if (!target.classList.contains("fa-check")) return;
    fetch("/api/items", {
        method: "DELETE",
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: target.dataset.id
        })
    })
        .then((response) => {
            if (response.ok) return response.json()
            throw Error(response.statusText);
        })
        .then((resVal) => {
            removeElementFromScreen(e.target.parentNode);
        })
        .catch((err) => {
            // TODO: flash a message for 3 seconds and then delete it using setTimeout
            alert(err)
        })
}

keys.items_wrapper.addEventListener("click", deleteItem)