

var userdict = {};
// dict.key1 = "value1";
// dict.key2 = "value2";


var time_stamp = function(author){
	var time_stamp = Date.now() / 1000 | 0;
	userdict[author]=time_stamp;
}


var show_all_stamps = function(author){
	var ts_string = "";
  	for (var key in userdict) {
	  var value = userdict[key];
	  var ts = new Date(value*1000).toISOString().slice(0, -5);
	  ts_string = ts_string + key+" was "+ ts + "\n";
	    // Use `key` and `value`
	}
	return ts_string;
}


module.exports = {
   time_stamp : time_stamp,
   show_all_stamps : show_all_stamps,
   userdict:userdict
}