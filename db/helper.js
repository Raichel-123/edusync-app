let mysql = require('mysql');

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'edusync',
  password : 'edusync',
  database : 'edusync'
});

connection.connect();

function queryHelper(query, queryParams){
    return new Promise(function(resolve, reject) {
        connection.query(query, queryParams, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

exports.query = queryHelper;
