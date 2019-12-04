// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// STATIC DATA, must be moved to DB afterwards
var stops = [
    {
        id: 1,
        vuforiaName: 'stones',
        type: 'info',
        data: 'This text is for stones!'
    },
    {
        id: 2,
        vuforiaName: 'astronaut',
        type: 'info',
        data: 'This text is for astronaut!'
    }
];

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api/stops)
router.get('/stops', function(req, res) {
    res.json(stops);   
});

router.get('/stats', function(req, res) {
    res.json({
        'totalStops':stops.length
    });
});

// find step by vuforia name
router.get('/stop', function(req, res) {
    let vuforiaStopName = req.query.name;
    var matchingStops = stops.filter(function(stop) {
        return stop.vuforiaName === vuforiaStopName;
      });
    
    if (matchingStops.length < 1)
        res.send(404);
    else
    {
        res.json(matchingStops[0]);   
    }
});

// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);