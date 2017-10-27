var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table"); //needed to log the product table 
//var prompt = require("prompt");

//var customer = require("./customer.js");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "root",

	database: "bamazonDB"
});
connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id "+ connection.threadId + "\n");
});