const connection = require('../config/connection.js');

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  //these get returned to create the query string in the model.
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

    // Object for all our SQL statement functions.
const orm = {
    selectAll: function(tableInput, cbModel) {
        console.log("GET orm triggered")
        var queryString =  "SELECT * FROM " + tableInput + ";";
            // console.log("THIS IS THE queryString: ", queryString)
        connection.query(queryString, function(err, result) {
            // console.log("THIS IS THE connection.query result: ", result)
            if (err) {
                console.log("THIS IS THE ERROR: ", err)
            throw err;
            }
            cbModel(result);
        });
    },
    insertOne: function(table, cols, vals, cbCreateModel){
        console.log("CREATE model triggered")
        console.log("table: ", table)
        console.log("cols: ", cols)
        console.log("vals: ", vals)
        //build out this connection.query; ultimately it should read "INSERT INTO burgers (burger_name, devoured) VALUES (?,?)"
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

        console.log(queryString);
    connection.query(queryString, vals, function(err,result){
        if(err) {
            throw error;
        }
        cbCreateController(result);
    });
}
}
module.exports = orm;
