
var fs = require('fs');
var userlist = "";

var util = require('util');

function save_json(obj){
	fs.writeFile('./userlist.json', JSON.stringify(obj, null, 2),function (err, data) {
	  if (err) throw err; // we'll not consider error handling for now
	  // console.log("saved json: "+data);
	})
// 	console.log("saved json: "+obj);
}

function load_json(){
	fs.readFile('./userlist.json', 'utf8', function (err, data) {
	  if (err) throw err; // we'll not consider error handling for now
	  console.log("loaded json: "+data);
	  userlist = JSON.parse(data);
	});
	// return userlist;
}




var process_calendar = function(message,delim="!calendar"){
	
    var ret_string = "This function is in progress"
	return ret_string;

}


module.exports = {
   process_calendar : process_calendar,
   load_json:load_json

}
