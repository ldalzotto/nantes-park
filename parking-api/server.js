// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('./node_modules/express/index.js');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('./node_modules/body-parser/index.js');
var parkService= require('./app/park-service.js');
var stringify = require('stringify-json');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();               // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


// more routes for our API will happen here
router.route('/park-from-raw-data')
        .post(function(req, res){
            parkService.getDataFromRawParking(req).then((result) => {
                res.end(stringify(result));
            });
        });

router.route('/parking/from-park-id')
    .get(function(req,res){
        parkService.getParkingDataInfo(req.query.parkid).then((result) => {
            res.end(stringify(result));
        })
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);