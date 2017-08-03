

const MongoClient = require('mongodb').MongoClient
var configDB = require('./database.js');

function push_to_db(message, quote, timeshift){
	
    var ret_string = "Push to the database failed..."
    var dict = []; // create an empty array
    var user_string = message.author.toString().replace(/[\<\>\@]/g,'');
    var ts = new Date( (Date.now() / 1000 | 0)*1000 ).toISOString().slice(0, -5);


    dict.push({
        timestamp : ts,
        user: user_string,
        text: quote
    });
    console.log('built: '+JSON.stringify(dict));
    MongoClient.connect(configDB.url, (err, database) => {
        if (err) return console.log(err)
        database.collection('calendar', function(err, collection) {
            collection.insert(dict, {safe:true}, function(err, result) {
                console.log('saved to database: '+JSON.stringify(dict))
//                 message.author.send("Your entry has been saved to the database.\n"
//                                     +"magnus.bot.nu/m"+user_string);
                ret_string = "Your entry has been saved to the database!";
            })      
        })
    })
    return ret_string;
}

function pull_from_db(){
    var ts = new Date( (Date.now() / 1000 | 0)*1000 ).toISOString().slice(0, -5);
    console.log("ts:"+ts);
    db.collection('calendar').find({timestamp:ts}).toArray((err, result) => {
        
        console.log(result);
  
    })
}



var process_calendar = function(message,delim="!calendar"){
    var text = message.toString();
    var res = text.toLowerCase().split(" ");
    var quote = text.split("\"");
    var has_quote = false;
    
    
    var param = res[1];
    
    var ret_string = "Your input did not match expected pattern\n"
              +"!calendar view \n     shows calendar enries \n"
              +"!calendar {time} \"text\" \n     creates {timed} calendar entry \n"
              +"     Valid entries are: \n          daily|weekly|monthly|yearly \n"
              +"!calendar clear \"text\" \n     wipes your calendar entry \n"
              ; 
    
    if(!quote[1]){
//         ret_string = "Missing quote for text\n" + ret_string;
    }else{
        has_quote = true;
    }
    
    if(param == "view" || param == "v"){
        has_quote=true; // to prevent extra error message
    }else if(has_quote && (param == "daily" 
                           || param == "d")){
        ret_string = push_to_db(message, quote, 0);
    }else if(param == "monthly" || param == "m"){
    }else if(param == "weekly" || param == "w"){
    }else if(param == "yearly" || param == "y"){
    }else if(param == "clear" || param == "c"){
    }else{
//         ret_string = "Parameter:"+param+" does not match expected value\n"+ret_string;
//         has_quote=true; // to prevent extra error message
    }
    
	if(has_quote == false){
        ret_string = "Missing quote for text\n" + ret_string;   
    }
    
	return ret_string;

}


module.exports = {
   process_calendar : process_calendar
}
