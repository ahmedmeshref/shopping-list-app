const express = require("express");
const api = express.Router();
const Item = require("./models/itemSchema");


let send400 = (res, err = 'Required data is missing!') => {
    res.status(400).json({
        message: 'Bad Request',
        err: err.message
    })
}

let send500 = (res, err) => {
    res.status(500).json({
        message: "Internal Server Error!",
        err: err.message
    })
}

let formatName = (name) => {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

api.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json({
        items: items
    });
});

api.post('/items', async (req, res) => {
    const name = req.body.name;
    if (!name) send400(res);
    const formattedName = formatName(name),
        nameExist = await Item.findOne({name: formattedName}).exec();
    if (nameExist === null) {
        try {
            const new_item = new Item({
                name: formattedName
            })
            await new_item.save();
            res.json(new_item);
        } catch (err) {
            send500(res);
        }
    }
    send400(res);
});


api.delete('/items', (req, res) => {
    const id = req.body.id;
    if (!id) send400(res);
    Item.findOneAndDelete({_id: id}, (err, item) => {
        if (err) {
            send400(res, err);
        } else {
            res.json({
                success: true,
                item: item
            })
        }
    })
})


api.patch('/items', (req, res) => {
    const id = req.body.id,
        new_name = req.body.new_name;

    Item.findOneAndUpdate({_id: id}, {name: new_name}, {new: true}, (err, doc) => {
        if (err) {
            send500(req, err);
        }
        res.json(doc);
    })
})


module.exports = api;