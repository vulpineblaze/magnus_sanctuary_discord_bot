
const MongoClient = require('mongodb').MongoClient


var configDB = require('./database.js');


var check_and_store = function(message){
	// userlist = load_json();
    var str = message.content.toLowerCase();
	if(str.charAt(0)==':'){
        var res = str.split(":");
        var mood = res[1];
        var number = res[2];
        var desc = res[3];
//         console.log(str+"|"+mood+"|"+number+"|"+desc);
        message.channel.sendMessage("Your mood is: "+mood+"\nYour number is: "+number+"\nYour desc is: "+desc);
//         message.channel.sendMessage("I have no current saving capacity.");
        
        var dict = []; // create an empty array
	 
        
        dict.push({
            server:   message.guild.id.toString(),
            user: message.author.toString(),
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
              message.channel.sendMessage("Your entry has been saved to the database.");
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
