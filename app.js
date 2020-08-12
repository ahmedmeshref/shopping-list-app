const express = require('express');
const app = express();

// configure static files
app.use(express.static('static'))


const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})