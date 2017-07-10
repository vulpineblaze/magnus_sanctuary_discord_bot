
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
        message.channel.sendMessage("I have no current saving capacity.");
	}
    
    


	

}



module.exports = {
   check_and_store : check_and_store
}
