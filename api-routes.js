//Init express router
let router = require('express').Router();

//Default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome!',
        routes: {
            doc: "http://localhost:3000/api-docs",
            gen_quote: "http://localhost:3000/api/v1/generate-changing-life-quote"
        }
    });
});

//Import controller
var quoteController = require('./app/quoteController');

//Quote routes
router.route('/generate-changing-life-quote').get(quoteController.new);

router.route('/generate-changing-life-quote/:quote_id')
.get(quoteController.view)
.delete(quoteController.delete)

//Export Routes
module.exports = router;