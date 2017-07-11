
const MongoClient = require('mongodb').MongoClient


var configDB = require('./database.js');


var check_and_store = function(message){
	// userlist = load_json();
    var str = message.content.toLowerCase();
	if(str.charAt(0)=='!' && str.charAt(1)==':'){
        var res = str.split(":");
        var mood = res[1];
        var number = res[2];
        var desc = res[3];
//         console.log(str+"|"+mood+"|"+number+"|"+desc);
		if(mood && number && desc && !isNaN(number)){
            message.channel.send("Your mood is: "+mood+"\nYour number is: "+number+"\nYour desc is: "+desc);

        }else{
            message.channel.send("Your input did not match expected format.\n"
                                        +"!:mood:number(1-5):long description\n"
                                        +"eg.     !:happy:5:the bot is finally working!");
		return false;
        }
//         message.channel.sendMessage("I have no current saving capacity.");
        
        var dict = []; // create an empty array
	    var user_string = message.author.toString().replace(/[\<\>\@]/g,'');
        var ts = new Date( (Date.now() / 1000 | 0)*1000 ).toISOString().slice(0, -5);
        
        dict.push({
	        timestamp : ts,
            user: user_string,
            mood: res[1],
            number: res[2],
            desc: res[3]
        });
        console.log('built: '+JSON.stringify(dict));
        MongoClient.connect(configDB.url, (err, database) => {
          if (err) return console.log(err)
          
//           database.collection('moodtrack').save(dict, (err, result) => {
//               if (err) return console.log(err)
//               console.log('saved to database: '+JSON.stringify(dict))
//               message.channel.sendMessage("Your entry has been saved to the database.");
//             })
//         })
            database.collection('moodtrack', function(err, collection) {
//              var object= {word:'TEST'};
             collection.insert(dict, {safe:true}, function(err, result) {
                 console.log('saved to database: '+JSON.stringify(dict))
              message.author.send("Your entry has been saved to the database.\n"
                                  +"magnus.bot.nu/m"+user_string);
//                collection.findOne({word:'TEST'}, function(err, item) {
//                   console.log(item);
//                });
             })      
         })
        })
	}
    
    
            
	

}



module.exports = {
   check_and_store : check_and_store
}
