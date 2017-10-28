var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table"); //This will log the product table in a more organized format 
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
	console.log("\nconnected to Bamazon Manager Access "+ connection.threadId + "\n");
	//displayInventory();
	promptManagerAction();
	//promptManagerAction();
});
// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
	// console.log('___ENTER displayInventory___');

	// Construct the db query string
	queryString = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryString, function(err, response) {
		if (err) throw err;

		console.table("Available Items ",response);
	  	console.log("--------------------------------------------------------------\n");

		connection.end();
		
	})
}

function promptManagerAction() {
	// console.log('___ENTER promptManagerAction___');

	// Prompt the manager to select an option
	inquirer.prompt([
		{
			type: 'list',
			name: 'option',
			message: 'Please select a Menu Option:',
			choices: ['View Products for Sale','View Low Inventory', 'Add to Inventory', 'Add New Product'],
			filter: function (val) {
				if (val === 'View Products for Sale') {
					return 'displayInventory';
				} else if (val === 'View Low Inventory') {
					return 'lowInventory';
				} else if (val === 'Add to Inventory') {
					return 'addInventory';
				} else if (val === 'Add New Product') {
					return 'newProduct';
				} else {
					// This case should be unreachable
					console.log('Error: Invalid operation!');
					exit(1);
				}
			}
		}
	]).then(function(input) {
		// console.log('User has selected: ' + JSON.stringify(input));

		// Trigger the appropriate action based on the user input
		if (input.option === 'displayInventory') {
			displayInventory();
		} else if (input.option === 'lowInventory') {
			displayLowInventory();
		} else if (input.option === 'addInventory') {
			addInventory();
		} else if (input.option === 'newProduct') {
			createNewProduct();
		} else {
			// This case should be unreachable
			console.log('Error: Please Initiate a Valid operation!');
			exit(1);
		}
	})
}

// displayLowInventory will display a list of products with stock level below 5
function displayLowInventory() {

	// Construct the db query string
	queryString = 'SELECT * FROM products WHERE stock_quantity < 5';

	// Make the db query
	connection.query(queryString, function(err, response) {
		if (err) throw err;

		console.log('Products with stock level below 5: ');
		console.log('..................................\n');
		// for(var i=0; i<response.length; i++){ 
		// 	console.log(response[i].item_id + "|" + response[i].product_name
		// 	+ "|" + response[i].department_name + "|" + response[i].price + "|" + response[i].stock_quantity);
		// }
		console.table(response);
		connection.end();
	})
}

// validateInteger makes sure that the user is supplying only positive integers for their inputs
function validateInteger(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a valid number: must be a non-zero whole number.';
	}
}

// validateNumeric makes sure that the user is supplying only positive numbers for their inputs
function validateNumeric(value) {
	// Value must be a positive number
	var number = (typeof parseFloat(value)) === 'number';
	var positive = parseFloat(value) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Unit price must be a positive number.'
	}
}

// addInventory will guilde a user in adding additional quantify to an existing item
function addInventory() {
	// console.log('___ENTER addInventory___');

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Enter the Item ID',
			validate: validateInteger,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to add?',
			validate: validateInteger,
			filter: Number
		}
	]).then(function(input) {
		// console.log('Manager has selected: \n    item_id = '  + input.item_id + '\n    additional quantity = ' + input.quantity);

		var item = input.item_id;
		var addQuantity = input.quantity;

		// Query db to confirm that the given item ID exists and to determine the current stock_count
		var queryString = 'SELECT * FROM products WHERE ?';

		connection.query(queryString, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				addInventory();

			} else {
				var productData = data[0];

				console.log('Updating Inventory...');

				// Constructing the updating query string
				var updateQueryString = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;
				// console.log('updateQueryString = ' + updateQueryString);

				// Update the inventory
				connection.query(updateQueryString, function(err, data) {
					if (err) throw err;

					console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
					console.log("\n---------------------------------------------------------------------\n");

					// End the database connection
					connection.end();
				})
			}
		})
	})
}

// createNewProduct will guide user through a series of prompts to add a new product
function createNewProduct() {

	// Prompt the user to enter information about the new product
	inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
			message: 'Please enter the new product name.',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'Which department does the new product belong to?',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the price per unit?',
			validate: validateNumeric
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items are in stock?',
			validate: validateInteger
		}
	]).then(function(input) {
		// console.log('input: ' + JSON.stringify(input));

		console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +  
			'    department_name = ' + input.department_name + '\n' +  
			'    price = ' + input.price + '\n' +  
			'    stock_quantity = ' + input.stock_quantity);

		// Create the insertion query string
		var queryString = 'INSERT INTO products SET ?';

		// Add new product to the db
		connection.query(queryString, input, function (error, results, fields) {
			if (error) throw error;

			console.log('New product added !...');
			console.log("\n---------------------------------------------------------------------\n");
			displayInventory();
			//connection.end();

			
		});
		// var queryString2 = 'SELECT * FROM products WHERE ?';
		// connection.query(queryString2, input.product_name, function(err, response) {
		// 	if (err) throw err;

		// 	console.table(response);
		// 	console.log(response);

		// 	// End the database connection
		// 	connection.end();
		// })
	})
}

