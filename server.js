const express = require('express');

// Create app
const app = express();

/*
configure middleware
 */
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
// routes
app.use('/', require('./router'));


const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})