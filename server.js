const express = require('express');
const {db} = require('./db/connection');

// Create app
const app = express();


// Configure static files
app.use(express.static('./views'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
// configure middleware
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies


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