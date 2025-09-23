// MODULE FOR HANDLING POSTGRESQL DATABASE QUERIES
// ===============================================

// LIBRARIES AND MODULES
// ---------------------

// EXTERNAL LIBRARIES

// Pg-pool 
const Pool = require('pg').Pool;

// LOCAL LIBRARIES AND MODULES

// DEFINITIONS
// -----------

// Connection settings
const connection = {host: '127.0.0.1',
    port: '5432',
    database: 'autolainaus',
    user: 'websovellus',
    password: 'Q2werty7'
};

// Create pool object for transactions
const pool = new Pool(connection);

// CRUD FUNCTIONS

/** 
* A function to insert data into database.
* @summary Allows you to insert data into database with SQL statement and values.
* @async
* @param {string} sqlstatement - SQL statement for inserting data. 
* @param {Array} values - Array of values to be inserted.
* @return {Promise} Returns a promise that resolves to the result set of the query.
*/

const insertQuery = async (sqlstatement, values) => {
    let resultset = await pool.query(sqlstatement, values);
    return resultset;
} 

/** 
* Select data from database.
* @summary Runs a select query with given SQL statement.
* @async    
* @param {string} sqlstatement - SQL statement for selecting data.
* @return {Promise} Returns a promise that resolves to the result set of the query.
*/

const selectQuery = async (sqlstatement) => {
    let resultset = await pool.query(sqlstatement);
    return resultset;
}
// Update data with SQL statement

// Delete data with SQL statement

// APP SPECIFIC QUERIES

// Home page

/** 
* Get free vehicles from database.
* @summary Returns all rows from view vapaana (free vehicles).
* @async
* @return {Promise} Returns a promise that resolves to the result set of the query.
*/

const getFreeVehicles = async () => {
    let sqlstatement = 'SELECT * FROM public.vapaana';
    let resultset = await pool.query(sqlstatement);
    return resultset;
}

/** 
* Get vehicles in use from database.
* @summary Returns all rows from view ajossa (vehicles in use).
* @async
* @return {Promise} Returns a promise that resolves to the result set of the query.
*/

const getVehiclesInUse = async () => {
    let sqlstatement = 'SELECT * FROM public.ajossa';
    let resultset = await pool.query(sqlstatement);
    return resultset;
}

/** 
* Get vehicle details from database.
* @summary Returns all rows from view ajopaivakirja (vehicle details).
* @async
* @return {Promise} Returns a promise that resolves to the result set of the query.
*/

const getVehicleDetails = async () => {
    let sqlstatement = "SELECT * FROM public.ajopaivakirja WHERE rekisterinumero = 'XYZ-123'";
    let resultset = await pool.query(sqlstatement);
    return resultset;
}

/** 
* Get vehicle details from database.
* @summary Returns all rows from view ajopaivakirja (diary).
* @async
* @param {Array} values - Array of register numbers to be used in the query.
* @return {Promise} Returns a promise that resolves to the result set of the query.
*/

const getVehicleDetails2 = async (values) => {
    let sqlstatement = 'SELECT * FROM public.ajopaivakirja WHERE rekisterinumero = $1';
    let resultset = await pool.query(sqlstatement, values);
    return resultset;
}

// Vehicle details page - vehicle in use by register number: SQL + value 2nd method
const query = {
    text: 'SELECT * FROM public.ajopaivakirja WHERE rekisterinumero = $1',
    values: ['XYZ-123']
}
    
/** 
* A generic function to run a query with pre-structured statement and values.
* @summary Executes a SQL query with the provided parameters.
* @param {Object} query - The query object containing text and values.
* @return {Promise} Returns a promise that resolves to the result set of the query.
*/

const runQueryWithValues = async (query) => {
    let resultset = await pool.query(query);
    return resultset;
}

// Diary page - all vehicles
const getDiary = async () => { 
    let sqlstatement = 'SELECT * from public.ajopaivakirja';
    let resultset = await pool.query(sqlstatement);
    return resultset;
}
// Location page - location by register number -> create a view for this

const getLocationByReg = async (values) => {
    let sqlstatement = 'SELECT * FROM public.sijainti WHERE rekisterinumero = $1';
    let resultset = await pool.query(sqlstatement, values);
    return resultset;
}

// EXPORT FUNCTIONS
// ----------------
module.exports = {insertQuery, selectQuery, getFreeVehicles, getVehiclesInUse, getVehicleDetails, getVehicleDetails2, getDiary, runQueryWithValues, getLocationByReg};
