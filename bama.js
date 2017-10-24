var mysql = require("mysql");
var consoleTable = require("console.table"); //needed to log the product table 

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
	nowConnectedToProducts();
});
function nowConnectedToProducts(){
		connection.query("select * from products", function(err, response){
		if(err){
			throw err;
		}

		//console.log(response);
		// for(var i=0; i<response.length; i++){  // organizing response nicely
		// 	console.log(response[i].item_id + "|" + response[i].product_name + "|" 
		// 	+ response[i].department_name + "|" + response[i].price + "|" + response[i].stock_quantity);
		// }
		console.table(response);
	});

}