var mysql = require("mysql");
var consoleTable = require("console.table"); //needed to log the product table 
var prompt = require("prompt");

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
	// 	connection.query("select `item_id` `id`, `product_name` `Product`, `department_name` `Department`, `price` `Dollars`, `stock_quantity` `Quantity` from products", function(err, response){
	// 	if(err){throw err};
	// 	//console.log(response);
	// 	// for(var i=0; i<response.length; i++){ 
	// 	// 	console.log(response[i].item_id + "|" + response[i].product_name + "|" 
	// 	// 	+ response[i].department_name + "|" + response[i].price + "|" + response[i].stock_quantity);}
	// 	console.table(response);
	// });

	connection.query("select `item_id` `id`, `product_name` `Product`, `price` `Dollars` from products", function(err, response){
	if(err){throw err};
	console.table("Available Items \n",response);
	promptUser();
		
	});
	prompt.start();
	var promptUser = function(){
	//var self = this;
	
	// Get order and quantity 
	prompt.get([{name:'item_id',
				description: 'Product_Id',
				type: 'integer',
				required: true
				},
				{name:'stock_quantity',
				description: 'Order Quantity',
				type: 'integer',
				required: true}], function (err, result) {


		console.log('\nOrder Details:');
		console.log('~~~~~~~~~~~~~');
		console.log('Item Id: ' + result.item_id);
		console.log('Quantity: ' + result.stock_quantity);
		console.log('~~~~~~~~~~~');

	
		console.log("\nUpdating Products Table ...\n");
		// connection.query("select `item_id` `id`, `product_name` `Product`, `price` `Dollars`, `stock_quantity` `Level` from products",function(err, res){
		// 	if(err){throw err};
		// 	//console.log(res); shows raw response with Alias names
		// 		console.log(res[0].id);
		// 		console.log(res[0].Product);
		// 		console.log(res[0].Dollars);
		// 		console.log(res[0].Level);
		// 	});
	
		connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: 22}, {item_id: 1 }], 
			function(err, res) {
      		console.log(res.affectedRows + " products updated!\n");
      		})

			
		});
	};
};
