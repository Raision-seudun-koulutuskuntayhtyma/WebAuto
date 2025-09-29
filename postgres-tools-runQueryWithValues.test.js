// Import functions and the pool from postgres-tools module
const pgTools = require('./postgres-tools');
// Test for function runQueryWithValues 
// 
test('Select all rows from test table', () => {

    // Define a SQL statement to be used
    let query = {
        text:'SELEC * FROM jest_test WHERE id = $1',
        value: [4]
    };
    
    // Define a lists of objecst with correct properties
    let correctResultset = {
    id: 4,
    nimi: 'Calle Keckelberg',
    palkka: 7650,
    koodari: false,
    aikaleima: '2025-09-29T08:15:05.275Z'
    };

    // Run the query and wait for the results
    pgTools.runQueryWithValues(query) .then((resultset) => {

        // Because rows are objects use toEqual for comparison: properties
        // are the same, but objects are different objects
        expect(resultset.rows[0]).toEqual(correctResultset);
    });
})
