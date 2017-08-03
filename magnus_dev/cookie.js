
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

function add_text_func(message){
		var author = message.author;
		if(userlist[author]){
			var cookie_cnt = userlist[author]; 
// 			console.log("cookie:"+cookie_cnt+"|"+author);
			if(cookie_cnt && !isNaN(cookie_cnt) ){
				return "\n     You have "+cookie_cnt+ " cookies.";
			}            
		} 
	return "";
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
	var add_text = "";
	if (user){}else{
        // add text will append error msg with users curent cookie count
		var add_text = add_text_func(message);
		return " \nPlease @mention a user deserving a cookie."+add_text;
	}

	var value = 1;

	var test_user = message.mentions.users;
	// console.log("user.id:"+user.id); // undefined
// 	console.log("test_user:"+test_user.array());
    var found_in_mentions = test_user.array().toString();
    var found_in_json = user.toString().replace(/\!/g, '');
    var found_as_author = message.author.toString().replace(/\!/g, '');
	if(found_in_mentions == found_as_author){
		console.log("self! "+found_in_mentions+" == "+found_as_author);
		return " Can't give yourself a cookie, silly! "+add_text_func(message);
	}else if(found_in_mentions == found_in_json){
		console.log("equal! "+found_in_mentions+" == "+found_in_json);
	}else{
        console.log("not equal! "+found_in_mentions+" != "+found_in_json);
		return " User does not match @mention. \nPlease @mention the user deserving a cookie."
	}

	if(userlist[found_in_json]){
		userlist[found_in_json]++;
		value = userlist[found_in_json]; // doesnt update inc correctly
	} else{
		userlist[found_in_json] = value;
	}

	save_json(userlist);


	var linkable_user = found_in_json;
	var ret_string = linkable_user+" now has "+value+" cookies!"
	return ret_string;

}


module.exports = {
   give_cookie : give_cookie,
   load_json:load_json

}
