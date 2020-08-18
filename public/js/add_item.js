const app = {
    add_item_form: document.getElementById("add-item-form"),
    item_name: document.getElementById("item-name")
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

let addNewItem = (e) => {
    e.preventDefault();
    const name = app.item_name.value;
    if (name){
        postData('/list', {
            name: name
        })
            .then((resObj) => {
                print(resObj)
            })
            .catch((err) => {
                print(err)
            })
    } else {
        print("name is not giving");
    }
}

app.add_item_form.addEventListener('submit', addNewItem)