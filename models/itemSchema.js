const Mongoose = require('mongoose');

const itemsSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// set up the mode
module.exports= {
    Item: Mongoose.model("items", itemsSchema)
}
