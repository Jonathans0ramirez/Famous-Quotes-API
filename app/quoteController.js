//Quote model and quote-image generator 
Quote = require('./quoteModel');
const { generateQuoteImage } = require('./random-quote');

// Regular expression that checks for hex value
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

//Handle create generated quote-image and check for errors
exports.new = function (req, res) {
    generateQuoteImage()
    .then(newQuote => {
        res.send(newQuote)
    })
    .catch(err => {
        res.status(500).json({
            status: "500 Internal Server Error",
            error: err
        })
    });
};

//Handle findQuoteById
exports.view = function (req, res) {
    if (!isObjectId(req.params.quote_id)) {
        res.status(400).json({
            status: "400 Bad Request",
            message: "Incorrect representation of the BSON ObjectId type."
        });
    }
    else {
        Quote.findById(req.params.quote_id, function (err, quote) {
            if (err) { 
                res.status(404).json({
                    status: "404 Not Found",
                    message: "Qoute not found in DB"
                }); 
            }
            res.json(quote);
        });
    }
};

//Handle delete quote y id
exports.delete = function (req, res) {
    if (!isObjectId(req.params.quote_id)) {
        res.status(400).json({
            status: "400 Bad Request",
            message: "Incorrect representation of the BSON ObjectId type."
        });
    }
    else {
        Quote.remove({ _id: req.params.quote_id }, function (err, quote) {
            if (err) { 
                res.status(404).json({
                    status: "404 Not Found",
                    message: "Qoute not found in DB"
                }); 
            }
            res.json({
                status: "Success",
                message: "Quote Deleted"
            });
        });
    }
};

function isObjectId (id) {
    return id.length === 12 || (id.length === 24 && checkForHexRegExp.test(id));
}