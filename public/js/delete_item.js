const keys = {
    items_wrapper: document.getElementById("table-body")
}

let delete_item = (e) => {
    const target = e.target
    console.log(target.classList.contains("fa-check"))
    console.log(target)
}

keys.items_wrapper.addEventListener("click", delete_item)