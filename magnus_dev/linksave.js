
const MongoClient = require('mongodb').MongoClient


var configDB = require('./database.js');



var check_and_respond = function(message){
	console.log(message);
	
}



module.exports = {
   check_and_respond : check_and_respond,
}
