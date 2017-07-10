
const MongoClient = require('mongodb').MongoClient


var configDB = require('./database.js');



var check_and_respond = function(message){
	if(message.attachments.first()){
    
        var dict = []; // create an empty array
        dict.push({
            link:   message.attachments.first().proxyURL.toString()
        });
        
        MongoClient.connect(configDB.url, (err, database) => {
          if (err) return console.log(err)

            database.collection('moodtrack', function(err, collection) {
                collection.insert(dict, {safe:true}, function(err, result) {
                     console.log('saved to database: '+JSON.stringify(dict))
                    message.channel.sendMessage("Your pictures link has been saved to the database.");
                })      
            })
        })

    
    
    }//end if
	
}



module.exports = {
   check_and_respond : check_and_respond,
}
