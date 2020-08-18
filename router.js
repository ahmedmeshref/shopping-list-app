const express = require("express");
const router = express.Router();
const db = require('./models/connection');
const Item = require("./models/itemSchema")


// Configure static files
router.use(express.static('./views'));
router.use(express.static('./public'));
// router.set('view engine', 'ejs');

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/list', async (req, res) => {
    const items = await Item.find();
    res.render('shop_list.ejs', {items: items});
});

router.post('/list', async (req, res) => {
    const name = req.body.name;
    if (name) {
        // add try catch to handle server errors
        try {
            const new_item = new Item({
                name: name
            })
            await new_item.save();
            res.json(new_item);
        } catch (err){
            res.status(500).json({
                message : err
            })
        }
    } else{
        res.status(400).json({
            message : 'Bad Request'
        })
    }
});



module.exports = router;