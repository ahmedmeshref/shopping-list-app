const Mongoose = require('mongoose');

const itemsSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// set up the mode
Mongoose.model("items", itemsSchema)
