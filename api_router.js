const express = require("express");
const api = express.Router();
const Item = require("./models/itemSchema");


api.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json({
        items: items
    });
});

api.post('/items', async (req, res) => {
    const name = req.body.name;
    if (name) {
        // add try catch to handle server errors
        try {
            const new_item = new Item({
                name: name[0].toUpperCase() + name.slice(1)
            })
            await new_item.save();
            res.json(new_item);
        } catch (err) {
            res.status(500).json({
                message: err
            })
        }
    } else {
        res.status(400).json({
            message: 'Bad Request'
        })
    }
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