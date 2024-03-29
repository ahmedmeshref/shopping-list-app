const express = require('express');

// create app
const app = express();

/*
configure middleware
 */
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
// routes
app.use('/api', require('./api_router'));
app.use('/', require('./router'));


const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})