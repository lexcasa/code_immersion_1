const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test_tienda'
});

connection.connect();

const dbService = {
    query: async (sql, arr) => {
        return new Promise( resolve => {
            connection.query(`${sql}`, arr, function (error, results, fields) {
                if(error){
                    resolve(error);
                } else {
                    resolve(results);
                }
            });
            // connection.connect();
        })
    }
}
module.exports = dbService;