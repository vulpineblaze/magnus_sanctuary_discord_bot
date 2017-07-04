

var fs = require('fs');

var redirects = "";


// var watchful_timeout = 6000;
var watchful_timeout = 6000;
// var watchful=true;
var watchful=true;

function toggle_watchful (arg) {
  watchful = arg;
}

function json_refresher(){
  fs.readFile('./redirects.JSON', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    redirects = JSON.parse(data);
  });
}

var check_and_respond = function(message){
  // userlist = load_json();

  if(watchful){

    //  REDIRECTS
    for(var attributename in redirects){
      // console.log(attributename+": "+redirects[attributename]);

      // if chan == atritube then break;
      var channel_name = message.channel.name;
      // console.log("channel_name:"+channel_name+" vs "+attributename);
      if(channel_name == attributename){
        continue;
      }

      if(attributename == "timeout"){
        if(watchful_timeout != redirects[attributename]){
          watchful_timeout = redirects[attributename];
        }
      }else{

        var redirect = redirects[attributename];
        if(new RegExp(redirect.join("|")).test(message.content.toLowerCase())){
          watchful=false;
          message.channel.sendMessage(message.author
                      +', It looks like your discussing #'
                      +attributename
                      +'! If so, Please head over to that channel.');
          setTimeout(toggle_watchful, watchful_timeout, true);
        }
      }
    }
  }

}



module.exports = {
   check_and_respond : check_and_respond,
   json_refresher:json_refresher
}