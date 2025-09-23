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

// Set a folder for static files like css or images
app.use(express.static('public'));

// Setup templating
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Setup URL parser to use extended option
app.use(express.urlencoded({extended: true}))

// URL ROUTES
// ----------

// A test route to test.handlebars page
app.get('/test', (req, res) => {
    testData = {'testKey': 'Hippopotamus is virtahepo in finnish'};
    pgtools.selectQuery('SELECT * FROM public.vapaana').then((resultset) => {
        console.log(resultset.rows)
    })
    res.render('test', testData)
});

// Route to home page
app.get('/', (req, res) => {
    res.send('This text will be replace by a handlebars homepage. Navigate to /test to see dynamic data in action')
});

// TODO: Route to vehicle listing page: free vehicles and vehicles in use
app.get('/vehicles', (req, res) => {
    let freeVehicleData = [];
    pgtools.getFreeVehicles().then((resultset) => {
        freeVehicleData = resultset.rows;
        console.log(freeVehicleData);
    });
    let inUseVehicleData = [];
    pgtools.getVehiclesInUse().then((resultset) => {
        inUseVehicleData = resultset.rows;
        console.log(inUseVehicleData);
    });
    res.send('Autojen tiedot tulevat tälle sivulle')
});
// TODO: Route to individual vehicle page: select vehicle by register number

// TODO: Route to vehicle's diary page: all entries for individual vehicle by register number

// TODO: Route to vehicle's tracking page: location by register number

// SERVER START
// ------------
app.listen(PORT)
console.log(`Server started on port ${PORT}`)