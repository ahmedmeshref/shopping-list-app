const keys = {
    items_wrapper: document.getElementById("table-body")
}

let sendDeleteRequest = async (data) => {
    let response = await fetch("/list", {
        method: "DELETE",
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

let delete_item = (e) => {
    const target = e.target
    // verify the click target to be the check btn
    if (!target.classList.contains("fa-check")) return;
    sendDeleteRequest({
        id: target.dataset.id
    })
        .then()
}

keys.items_wrapper.addEventListener("click", delete_item)