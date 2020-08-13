const express = require('express');
let engines = require('consolidate');
const app = express();

// configure static files
app.use(express.static('views'));
app.use(express.static('public'));




/*
Routes
 */
app.get('/', (req, res) => {
    res.render('index.html');
})

app.get('/shopping_list', (req, res) => {
    res.render('list.html');
})



const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})