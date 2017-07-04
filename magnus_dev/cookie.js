

// var userdict = {};
// dict.key1 = "value1";
// dict.key2 = "value2";

var fs = require('fs');
var userlist = "";

var util = require('util');

// function save_json(obj){
// 	fs.writeFile('./userlist.json', JSON.stringify(obj, null, 2),function (err, data) {
// 	  if (err) throw err; // we'll not consider error handling for now
// 	  console.log("saved json: "+data);
// 	});
// }
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

var give_cookie = function(message,delim="!cookie"){
	// userlist = load_json();

	var user = message.author.username;
	var text = message.toString();
	// var delim="!cookie";


	console.log("text:"+text);
	var result = text.slice(text.indexOf(delim) + delim.length);
	var user = result.match(/\S+/gi);
	console.log("user:"+user);
	if (user){}else{
		return " \nPlease @mention a user deserving a cookie."
	}

	var value = 1;

	var test_user = message.mentions.users;
	// console.log("user.id:"+user.id); // undefined
	console.log("test_user:"+test_user.array());
	if(test_user.array().toString() == user.toString()){
		console.log("equal! "+test_user.array()+" == "+user);
	}else{
		return " User does not match @mention. \nPlease @mention the user deserving a cookie."
	}

	if(userlist[user]){
		userlist[user]++;
		value = userlist[user]; // doesnt update inc correctly
	} else{
		userlist[user] = value;
	}

	save_json(userlist);

	// var linkable_user = message.guild.members.find('user.username', user);
	// console.log(Discord);
	var linkable_user = user;
	// var members = message.guild.members;
	// var mentions = message.mentions.users;
	// console.log("members:"+members);
	// console.log("mentions:"+mentions);
	// members.forEach(function(item) { /* etc etc */
	// 	console.log(item.id+" vs "+user); 
	// 	if(item.username == user){
	// 		linkable_user = item;
	// 	}else{
	// 		// nope
	// 	}
	// });

	// Object.keys(members).forEach(function(key) {
	//   var item = members[key];
	//   console.log(item+" vs "+user);
	// });
	// Object.keys(mentions).forEach(function(key) {
	//   var item = mentions[key];
	//   console.log(item+" vs "+user);
	// });

	// console.log("linkable_user:"+linkable_user)
	// console.log("author:"+message.author)
	var ret_string = linkable_user+" now has "+value+" cookies!"
	return ret_string;
	// var time_stamp = Date.now() / 1000 | 0;
	// userdict[author]=time_stamp;
}


// var time_stamp = function(author){
// 	var time_stamp = Date.now() / 1000 | 0;
// 	userdict[author]=time_stamp;
// }


// var show_all_stamps = function(author){
// 	var ts_string = "";
//   	for (var key in userdict) {
// 	  var value = userdict[key];
// 	  var ts = new Date(value*1000).toISOString().slice(0, -5);
// 	  ts_string = ts_string + key+" was "+ ts + "\n";
// 	    // Use `key` and `value`
// 	}
// 	return ts_string;
// }


module.exports = {
   give_cookie : give_cookie,
   load_json:load_json

}