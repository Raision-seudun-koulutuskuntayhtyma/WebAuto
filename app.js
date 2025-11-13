// WEB APPLICATION FOR SERVING RASEKO'S VEHICLE LENDING DATABASE
// =============================================================

// LIBRARIES
// ---------

// External libraries
// ------------------
const express = require('express');
const {engine} = require('express-handlebars');

// Local libraries and modules
// ---------------------------

const pgtools =  require('./postgres-tools')
// INITIALIZATION
// --------------

// Create an express app
const app = express();

// Define a TCP port to listen: read env or use 8080 in undefined
const PORT = process.env.PORT || 8080

// Set a folders for static files like css, images or icons
app.use(express.static('public'));
app.use('/images', express.static('public/images'));
app.use('/icons', express.static('public/icons'))

// Setup templating
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Setup URL parser to use extended option
app.use(express.urlencoded({extended: true}))

// URL ROUTES
// ----------


// Route to home page
app.get('/', (req, res) => {
    res.send('This text will be replace by a handlebars homepage. Navigate to /test to see dynamic data in action')
});

// Route to vehicle listing page: free vehicles and vehicles in use
app.get('/vehiclelist', (req, res) => {
    pgtools.getVehicleData().then((resultset) => {
        // Lets give a key for the resultset and render it to the page
        res.render('vehiclelist', {vehicleList: resultset.rows});
    })
})

// Route to individual vehicle page: select vehicle by register number
app.get('/vehicleDetails', (req, res) => {
    let register = req.query.register;
    pgtools.getVehicleDetails([register]).then((resultset) => {
        console.log(resultset.rows[0]);
        console.log(resultset.rows[0].otto);
        
        // Convert time stamp to user friendly string
        let userFriendlyTimestamp = pgtools.convertToDateTimeObject(resultset.rows[0].otto);
        console.log(userFriendlyTimestamp);
        let dateTimeValue = userFriendlyTimestamp.date + ' kello ' + userFriendlyTimestamp.time
        
        // Change original timestamp to string value
        resultset.rows[0].otto = dateTimeValue;

        // Render it to the page
        res.render('vehicleDetails', resultset.rows[0]);
        
    })
    
});

// Route to diary containing all vehicles
app.get('/diary', (req, res) => {
    pgtools.getDiary().then((resultset) => {
        // Lets give a key for the resultset and render it to the page
        res.render('diary', {diaryData: resultset.rows});
    })
    
});


// TODO: Route to vehicle's diary page: all entries for individual vehicle by register number

// TODO: Route to vehicle's tracking page: location by register number

// SERVER START
// ------------
app.listen(PORT)
console.log(`Server started on port ${PORT}`)