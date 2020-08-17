const mongoose = require('mongoose');


const connectionURI = 'mongodb+srv://ahmed:shopping@cluster0.t6qme.mongodb.net/shopping?retryWrites=true&w=majority';
mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to database")
});

module.exports = {
    db: db
};


