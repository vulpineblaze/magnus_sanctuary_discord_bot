

// var userdict = {};
// dict.key1 = "value1";
// dict.key2 = "value2";

var fs = require('fs');
var userlist = "";

var util = require('util');

function save_json(obj){
	fs.writeFile('./userlist.json', JSON.stringify(obj, null, 2),function (err, data) {
	  if (err) throw err; // we'll not consider error handling for now
	  // console.log("saved json: "+data);
	})
	console.log("saved json: "+obj);
}

function load_json(){
	fs.readFile('./userlist.json', 'utf8', function (err, data) {
	  if (err) throw err; // we'll not consider error handling for now
	  console.log("loaded json: "+data);
	  userlist = JSON.parse(data);
	});
	// return userlist;
}

var process_poll = function(message,delim="!cookie"){

	var user = message.author.username;
	var text = message.toString();

	
	var res = text.split(" ");
	
	console.log(user+"|"+res);
	
}



module.exports = {
   process_poll : process_poll,
   load_json:load_json

}
