

// var userdict = {};
// dict.key1 = "value1";
// dict.key2 = "value2";

var fs = require('fs');
var userlist = "";
var poll = [];

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
    
	
	var res = text.split(" ");
	var quote = text.split("\"");
    
    var retval = "Your input did not match expected pattern\n"
              +"!poll \"text\" | creates poll \n"
              +"!poll option \"text\" | adds option \n"
              +"!poll 1 | votes for option 1 \n"
              +"!poll clear | wipes current poll \n"
              ; 
	
    
    if(!res[1]){
        
    }else if (res[1].charAt(0) =='\"'){
	    // create poll
//         console.log("res1: "+res[1]);
        
        if(poll.length > 0 && poll[0].poll){
            retval = "Poll already exists!\n"
                    +poll[0].poll+"\n"
                    +poll[0].option;
        }else{
            if(!quote[1]){}else{
                poll.push({poll:quote[1],
                          user:author});
                retval = "Poll is now:\n"
                            +poll[0].poll;
            }
        }
	}else if (res[1]=="option"){
	    if(!quote[1]){}else{
	        poll.push({option:quote[1]});
        }
	}else if(res[1]=="clear"){
        poll = [];
    }
		  
	console.log(author+"|"+res+"|"+quote+"\n"+JSON.stringify(poll));
	
	return retval;
	
}



module.exports = {
   process_poll : process_poll,
   load_json:load_json

}
