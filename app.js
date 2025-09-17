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
    res.render('test', testData)
});

// Route to home page
app.get('/', (req, res) => {
    res.send('This text will be replace by a handlebars homepage. Navigate to /test to see dynamic data in action')
});

// Route to vehicle listing page

// Route to individual vehicle page

// Route to vehicle's diary page

// Route to vehicle's tracking page

// SERVER START
// ------------
app.listen(PORT)
console.log(`Server started on port ${PORT}`)