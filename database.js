const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'mysql'
});


connection.connect();


connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});


// function mysqlCallback(err,result,fields){
//     if (err) throw err;
//     console.log('The solution is: ', results[0].solution);
//     callback(results, fields);
// }


exports.join = function(name){
    "use strict";

}
exports.findByFoodName = function (foodname) {
    "use strict";
    ////
    return new Promise(function (resolve, reject) {
        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) reject(error);
            else {
                resolve({
                    error: error,
                    results: results,
                    fields: fields,
                });
            }
        });
    });


    // connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results[0].solution);
    //     callback(result, fields);
    // });
};
// connection.end();