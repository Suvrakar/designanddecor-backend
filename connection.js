// import { Contact } from "./contactModel"; ES6
let Contact = require("./controller")
let model = require("./contactModel")
var mysql = require('mysql');
const res = require("express/lib/response");

let tableSample = "customers"



//For connecting with Docker MySQL
var con = mysql.createConnection({
    host: process.env.MySQL_Host,
    user: process.env.MySQL_User,
    password: process.env.MySQL_Pass,
    database: process.env.MySQL_Db
});

let contact = new Contact(con);
// let model = new Model();



function connecToDb() {
    return new Promise((res, rej) => {
        con.connect(function (err) {
            if (err) rej(err);
            console.log("Connected!");
            var sql = `CREATE TABLE IF NOT EXISTS ${tableSample} (name VARCHAR(255), phone VARCHAR(255), email VARCHAR(255), message VARCHAR(255))`;
            con.query(sql, function (err, result) {
                if (err) rej(err);
                // console.log(result)
                console.log("Table created");
            });
        });
        return res(con);
    });   
}




let main = async () => {

    await connecToDb();


}


//calling the main function
// main()

module.exports = connecToDb;