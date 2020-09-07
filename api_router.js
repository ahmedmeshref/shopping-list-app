const express = require("express");
const api = express.Router();
const Item = require("./models/itemSchema");


let send400 = (res) => {
    res.status(400).json({
        message: 'Bad Request'
    })
}

let send500 = (res) => {
    res.status(500).json({
        message: err
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
        nameExist = await Item.findOne({ name: formattedName }).exec();
    if (nameExist === null){
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
        if (err){
            send500(res);
        } else {
            res.json({
                success: true,
                item: item
            })
        }
    })
})


module.exports = api;