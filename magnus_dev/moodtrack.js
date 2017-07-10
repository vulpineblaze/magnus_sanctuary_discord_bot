
var check_and_store = function(message){
	// userlist = load_json();
    var str = message.content.toLowerCase();
	if(str.charAt(0)==':'){
	    var res = str.split(":");
        var mood = res[0];
        var number = res[1];
        var desc = res[2];
	}
    console.log(str+"|"+res);
	
	

}



module.exports = {
   check_and_store : check_and_store
}
