const express = require("express");
const api = express.Router();
const Item = require("./models/itemSchema");


api.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json({
        items: items
    });
});


module.exports = api;