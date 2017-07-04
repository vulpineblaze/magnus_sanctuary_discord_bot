

var fs = require('fs');

var responses = "";


// var watchful_timeout = 6000;
var autorespond_timeout = 6000;
// var watchful=true;
var autorespond=true;

function toggle_autorespond (arg) {
  autorespond = arg;
}

function json_refresher(){
	fs.readFile('./responses.JSON', 'utf8', function (err, data) {
	  if (err) throw err; // we'll not consider error handling for now
	  responses = JSON.parse(data);
	});
}

var check_and_respond = function(message){
	// userlist = load_json();

	if(autorespond){
	// console.log(responses);
	//  AUTORESPNSES
	for(var attributename in responses){
	  // console.log(attributename+": "+responses[attributename]);
	  if(attributename == "timeout"){
	  	if(autorespond_timeout != responses[attributename]){
	  		autorespond_timeout = responses[attributename];
	  	}
	  }else{

		  var response = responses[attributename];
			if(new RegExp(response.join("|")).test(message.content.toLowerCase())){
		  	autorespond=false;
		  	message.channel.sendMessage(attributename);
		  	setTimeout(toggle_autorespond, autorespond_timeout, true);
	  	}
	  }
	}
  }
}



module.exports = {
   check_and_respond : check_and_respond,
   json_refresher:json_refresher
}