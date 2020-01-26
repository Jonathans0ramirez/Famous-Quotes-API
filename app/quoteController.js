//Quote model and quote-image generator 
Quote = require('./quoteModel');
const { generateQuoteImage } = require('./random-quote');

//Handle create generated quote-image and check for errors
exports.new = function (req, res) {
    generateQuoteImage()
    .then(newQuote => {
        console.log(newQuote);
        res.json({
            status: "success",
            message: "Quote retireved succesfully",
            data: newQuote
        });
    })
    .catch(err => {
        res.json({
            status: "error",
            error: err
        })
    });
};

//Handle findQuoteById
exports.view = function (req, res) {
    Quote.findById(req.params.quote_id, function (err, quote) {
        if (err)
            res.send(err);
        res.json({
            message: 'Quote Loading...',
            data: quote
        });
    });
};

//Handle delete quote y id
exports.delete = function (req, res) {
    Quote.remove({
        _id: req.params.quote_id}, function (err, quote) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: "Quote Deleted"
            });
        });
};