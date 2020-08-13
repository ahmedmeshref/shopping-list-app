const express = require('express');
let engines = require('consolidate');
const app = express();

// configure static files
app.use(express.static('./views'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');



/*
Routes
 */
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/list', (req, res) => {
    res.render('shop_list.ejs');
});


const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})