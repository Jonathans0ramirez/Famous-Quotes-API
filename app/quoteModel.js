var mongoose = require('mongoose');

//Schema
var quoteSchema = mongoose.Schema({
    quote: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

//Export quote model
var Quote = module.exports = mongoose.model('quote', quoteSchema);

module.exports.get = function (callback, limit) {
    Quote.find(callback).limit(limit);
}