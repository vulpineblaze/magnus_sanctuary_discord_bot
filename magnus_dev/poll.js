

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

	var author = message.author.username;
	var text = message.toString();
	var retval ="x";
    var poll = [];
	
	var res = text.split(" ");
	var quote = text.split("\"");
	
	if (res[1].charAt(0) =='\"'){
	    // create poll
        if(poll.poll){
            retval = "Poll already exists!\n"
                    +poll.poll+"\n"
                    +poll.option;
        }else{
            poll.push({poll:quote[1],
                      user:author});
        }
	}else if (res[1]=="option"){
	    poll.push({option:quote[1]});
	}else{
		 retval = "Your input did not match expected pattern\n"
              +"!poll \"text\" | creates poll "
              +"!poll option \"text\" | adds option "
              +"!poll 1 | votes for option 1 "
              +"!poll clear | wipes current poll "
              ; 
	}
		  
	console.log(user+"|"+res);
	
	return "Still in progress";
	
}



module.exports = {
   process_poll : process_poll,
   load_json:load_json

}
