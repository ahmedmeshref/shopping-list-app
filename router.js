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

router.get('/list', (req, res) => {
    res.render('shop_list.ejs');
});

module.exports = router