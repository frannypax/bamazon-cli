var mysql = require("mysql");
var consoleTable = require("console.table"); //needed to log the product table 
var prompt = require("prompt");

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
	nowConnectedToProducts();
});
function nowConnectedToProducts(){
	// connection.query("select `item_id` `id`, `product_name` `Product`, `department_name` `Department`, `price` `Dollars`, `stock_quantity` `Quantity` from products", function(err, response){
	// if(err){throw err};
	// console.log(response);
	// for(var i=0; i<response.length; i++){ 
	// 	console.log(response[i].item_id + "|" + response[i].product_name + "|" 
	// 	+ response[i].department_name + "|" + response[i].price + "|" + response[i].stock_quantity);}
	// console.table(response);
	// promptUser();
	// });
	
	displayInventory();
	function displayInventory() {
		var queryStringInventory =
	"select `item_id` `id`, `product_name` `Product`, `price` `Dollars`, `stock_quantity` `Level` from products";

	connection.query( queryStringInventory
		,function(err, response){
		if(err){
			throw err
		};
		console.table("Available Items ",response);
		//console.log(response);

		// for(var i=0; i<response.length; i++){ 
		// 	console.log(response[i].id + "|" + response[i].Product
		// 	+ "|" + response[i].Dollars + "|" + response[i].Level);
		// }

		promptUser();

		});	
	};
	prompt.start();
	var promptUser = function(){
	//var self = this;
	console.log("\nPlace your Order: Enter a product Id, and quantity needed");
	// Get order and quantity 
	prompt.get([{name:'item_id',
				description: 'Product_Id',
				type: 'integer',
				required: true
				},
				{name:'quantity',
				description: 'Order Quantity',
				type: 'integer',
				required: true}], function (err, result) {

				var itemId = result.item_id;
				var quantityOrdered = result.quantity;
				//var quantityRemaining = stock_quantity - quantityOrdered 

		console.log('\nOrder Details:');
		console.log('~~~~~~~~~~~~~');
		console.log('Item Id: ' + itemId);
		console.log('Quantity: ' + quantityOrdered);
		console.log('~~~~~~~~~~~');

	
		//console.log("\nUpdating Products Table ...\n");
		// connection.query("select `item_id` `id`, `product_name` `Product`, `price` `Dollars`, `stock_quantity` `Level` from products",function(err, res){
		// 	if(err){throw err};
		// 	//console.log(res); shows raw response with Alias names
		// 		console.log(res[0].id, "|", res[0].Product, "|", res[0].Dollars, "|", res[0].level );
		// 	});
		var queryString = "SELECT * FROM products WHERE?";
			connection.query(queryString, {item_id: itemId},function(err, data){
				if(err){
					throw err;
				};
				if (data.length === 0 || data.length > 10){
					console.log("\nError ... Please Enter a valid Id");
					displayInventory();
					console.log("\n");
				}else{
					var productData = data[0];
					//console.log("\n", productData);

						if(quantityOrdered <= productData.stock_quantity){
							var remainingQuantity = productData.stock_quantity - quantityOrdered;
						console.log("Placing Order ...")

						var updateQueryString = "UPDATE products SET ? WHERE ?";
						connection.query(updateQueryString,[{ stock_quantity: remainingQuantity }, {item_id: itemId }], function(err,data){
							if(err) throw err;

							console.log("Order has been Placed !");
							connection.end();
						});
						} else{
							console.log("\nSorry, you cannot order more than ", productData.stock_quantity );
							displayInventory();
							console.log("\nPlease modify your order.");
							
					}
					
				}
				
			});

			
		});
	};
};
