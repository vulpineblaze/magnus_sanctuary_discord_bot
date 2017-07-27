
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

var give_cookie = function(message,delim="!cookie"){
	// userlist = load_json();

	var user = message.author.username;
	var text = message.toString();
	// var delim="!cookie";


// 	console.log("text:"+text);
	var result = text.slice(text.indexOf(delim) + delim.length);
	var user = result.match(/\S+/gi);
// 	console.log("user:"+user);
	if (user){}else{
        // add text will append error msg with users curent cookie count
		var add_text = "";
		var author = message.author;
		if(userlist[author]){
			var cookie_cnt = userlist[author]; 
// 			console.log("cookie:"+cookie_cnt+"|"+author);
			if(cookie_cnt && !isNaN(cookie_cnt) ){
				add_text = "\n     You have "+cookie_cnt+ " cookies.";
			}            
		} 
		return " \nPlease @mention a user deserving a cookie."+add_text
	}

	var value = 1;

	var test_user = message.mentions.users;
	// console.log("user.id:"+user.id); // undefined
// 	console.log("test_user:"+test_user.array());
	if(test_user.array().toString() == user.toString().replace(/\/\!/g, '/')){
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


	var linkable_user = user;
	var ret_string = linkable_user+" now has "+value+" cookies!"
	return ret_string;

}


module.exports = {
   give_cookie : give_cookie,
   load_json:load_json

}
