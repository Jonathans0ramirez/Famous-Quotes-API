//Init express router
let router = require('express').Router();

//Default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome!'
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