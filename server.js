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
        Id: 1,
        VuforiaName: 'canteen',
        Type: 'info',
        Data: 'Find closest stairs go to the first floor turn left bit straight and left again',
        Fact: 'There are breakfast and lunch menus depending on time'
    },
    {
        Id: 2,
        VuforiaName: 'entrance',
        Type: 'info',
        Data: 'With entrance door at your back go straight on until you reach canteen',
        Fact: 'The school can be opened any time with student card'
    },
    {
        Id: 3,
        VuforiaName: 'creative',
        Type: 'info',
        Data: 'Go back to the to stairs canteen, heading towards entrance turn left and go straight, next stop will be on your right.',
        Fact: 'XR lab has also the newest Oculus Quest'
    },
     {
        Id: 4,
        VuforiaName: 'suoffice',
        Type: 'info',
        Data: 'Go back to the hall and at the end of it find stairs, last floor door with number 2 on them',
        Fact: 'It’s open only on Monday, Wednesday and Thursday'
        
    },
     {
        Id: 5,
        VuforiaName: 'administration',
        Type: 'info',
        Data: '',
        Fact: 'Everything regarding administration is handled here'
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
        'TotalStops':stops.length
    });
});

// find step by vuforia name
router.get('/stop', function(req, res) {
    let vuforiaStopName = req.query.name;
    var matchingStops = stops.filter(function(stop) {
        return stop.VuforiaName === vuforiaStopName;
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
