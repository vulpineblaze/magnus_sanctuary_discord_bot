/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

const util = require('util')


// import the discord.js module
const Discord = require('discord.js');
const config = require('./config.js');
const user_active = require('./active.js');
const cookie = require('./cookie.js');
const autorespond = require('./autorespond.js');
const redirector = require('./redirector.js');
const moodtrack = require('./moodtrack.js');
const linksave = require('./linksave.js');
const poll = require('./poll.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = config.token;

var fs = require('fs');

var json_refresh=true;


cookie.load_json();

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('I am ready!');
});
bot.on('error', function(err){
    // handle the error safely
    console.log(err)
})
// create an event listener for messages
bot.on('message', message => {
	user_active.time_stamp(message.author);

  // console.log(message.content.toLowerCase());
  
  var is_admin = false;
  if( message.member){
    is_admin =  message.member.hasPermission("ADMINISTRATOR");
  }

  if(json_refresh){
  	json_refresh = false;

  	redirector.json_refresher();
  	autorespond.json_refresher();
  	setTimeout(function(){json_refresh=true}, 0.1 * 60 * 1000);
  }

  if (message.content.toLowerCase() === 'ping') {
    // send "pong" to the same channel.
    message.channel.send('pong');
  }


  if(is_admin && message.content.toLowerCase().includes("show timestamps")){
  	var ts_string = user_active.show_all_stamps()
		message.channel.send("timestamps:\n"+ts_string);
  }

  if(is_admin && message.content.toLowerCase().includes("!cookie")){
  // if(message.content.toLowerCase().includes("!cookie")){
  	console.log(message.text);
  	var retval = cookie.give_cookie(message,"!cookie");
  	message.channel.send(retval);
  }
	
  if(message.content.toLowerCase().includes("!poll")){
  // if(message.content.toLowerCase().includes("!cookie")){
  	console.log(message.text);
  	var retval = cookie.give_cookie(message,"!poll");
  	message.channel.send(retval);
  }

  if(message.content.toLowerCase().includes("!topic")){
    var topic = message.channel.topic;
    var chan_name = message.channel.name;
    console.log("topic:"+topic);
    message.channel.send("#"+chan_name+":\n"+topic);
  }



	redirector.check_and_respond(message);
	autorespond.check_and_respond(message);
	moodtrack.check_and_store(message);
	linksave.check_and_respond(message);

});

// bot.on('guildMemberRemove', member => {
  
//   console.log('guildMemberRemove ' + member + " aka " +  member.user.username );
//   var user = "<@149628603632451584>";
//   // me <@149628603632451584>
//   // loki actual "<@246743107855581185>"
//   // var loki = member.client.users.find("<@149628603632451584>") 
//   var test = member.guild.owner; 
//   // console.log("test user left "+loki);
//   // console.log("test user left "+member.client.fetchUser(user).username );
  
//   test.sendMessage('test user left: '+ member + " aka " +  member.user.username )
//     .then(message => console.log(`Sent message: ${message.content}`))
//     .catch(console.error);
//     // for(var key in users) {
//     //   if(users.hasOwnProperty(key)) {
//     //       console.log("showing: "+users[key]);
//     //   }
//     // }
//   // loki.sendMessage("test user left "+loki);
// });



// log our bot in
try{
	console.log("My token is: "+token);
	bot.login(token);
}catch(err){
	console.log(err.message);
}
