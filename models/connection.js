const mongoose = require('mongoose');


const connectionURI = 'mongodb+srv://ahmed:shopping@cluster0.t6qme.mongodb.net/shopping?retryWrites=true&w=majority';
mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create connection
let db = mongoose.connection
    .on('error', console.error.bind(console, 'Connection error'))
    .once('open', () => {
        console.log('db connection open');
    });

module.exports = {
    db: db,
};


