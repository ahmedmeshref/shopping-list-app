const express = require("express");
const api = express.Router();
const Item = require("./models/itemSchema");


let send404 = (res) => {
    res.status(400).json({
        message: 'Bad Request'
    })
}

let send500 = (res) => {
    res.status(500).json({
        message: err
    })
}

api.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json({
        items: items
    });
});

api.post('/items', async (req, res) => {
    const name = req.body.name;
    if (!name) send404(res);
    const formattedName = name[0].toUpperCase() + req.body.name.slice(1).toLowerCase(),
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
    send404(res);
});


api.delete('/items', (req, res) => {
    const id = req.body.id;
    if (!id) {
        res.status(400).json({
            message: 'Bad Request'
        })
    }
    Item.findOneAndDelete({_id: id}, (err, item) => {
        if (err){
            res.status(500).json({
                success: true,
                message: 'Sever Error. Please try again!'
            })
        } else {
            res.json({
                success: true,
                item: item
            })
        }
    })
})


module.exports = api;