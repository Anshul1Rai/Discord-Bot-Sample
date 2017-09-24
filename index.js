const Discord=require('discord.js');
const YTDL= require("ytdl-core");
const bot= new Discord.Client();
const token='your token here';
 var count=0;


 var PREFIX="qwertyuiop";

// function to play from youtube
 function play(connection,message){
 	var server=servers[message.guild.id];

 	server.dispatcher=connection.playStream(YTDL(server.queue[0],{filter:"audioonly"}));

 	server.queue.shift();
 	server.dispatcher.on("end",function(){
 		if(server.queue[0]) play (connection,message);
 		else connection.disconnect();
 	});
 }


var servers={};

// to check if it is running or not
bot.on('ready', () => {
  console.log('I am ready!');
});


//  when players will join send invite

bot.on('guildMemberAdd', member => {
  // Send the message to the guilds default channel (usually #general), mentioning the member
  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
  member.addRole(member.guild.roles.find("name","Fgts"));
  // If you want to send the message to a designated channel on a server instead
  // you can do the following:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});


//all message commadns here

bot.on('message', message => {

  if (!message.guild) return;

  if(message.author.equals(bot.user)) return;

  var args= message.content.split(" ");

  switch(args[0]){

    case "!!ping":
     if(count<3)
     {message.reply('pong and do not spam ping i hate it.So, pleaste stop typing ping. Thank you!!');
     count++;}else{
     	message.reply('chup na bhadve bola na  ');
     }

     break;

    case "!!hi":
      message.channel.sendMessage('hi there', {tts: true});
      break;

    case "!!isup":
     message.reply('yes i am up and ready to serve');
     break;

    case "!!join":
        if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
         .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('I have successfully connected to the channel!');
          const dispatcher = connection.playFile('C:/Users/ANSHUL/Desktop/firstbotdiscord/songs/yoyo1.mp3');
          dispatcher.setVolume(0.3);
          }).catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
     break;


    case"!!leave":
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave();
      message.reply('I have  successfully left the channel');
    }
    break;

    case"!!pause":
    dispatcher.pause();
    break;

    case"!!resume":
    dispatcher.resume();
    break;


    case"!!play":

           if(!message.member.voiceChannel){
           	message.reply('You need to join voice channel first ');
             return;
           }

           if(!servers[message.guild.id]) {
           	servers[message.guild.id]={
                                      queue:[]
                                      };
            }

           var server= servers[message.guild.id];

           server.queue.push(args[1]);

           if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
           	play(connection,message);

           });

    break;


    case"!!skip":
           var server= servers[message.guild.id];

           if(server.dispatcher) server.dispatcher.end();
    break;


    case"!!stop":
          var server= servers[message.guild.id];

          if(message.guild.VoiceConnection) message.guild.voiceConnection.disconnect();

    break;

    case"!!aboutme":
     var embed =new Discord.RichEmbed()
     .setTitle("User Profile")
     .addField("Username", message.author.username,true)
     .addField("Tag",message.author.tag,true)
     .addField("Lastmessage",message.author.lastMessage)
     .addField("Created id",message.author.createdAt)
     .setThumbnail(message.author.displayAvatarURL)
     message.channel.sendEmbed(embed);
    break;

case"!!commands":
     var embed =new Discord.RichEmbed()
     .setTitle("List of commands")
     .setColor("RANDOM")
     .addField("!!aboutme", "To get some basic info about yourself",true)
     .addField("!!play <URL>", "To play some songs from youtube live",true)
     .addField("!!skip", "To skip the song from the queue",true)
     .addField("!!isup ", "To check whether the bot is alive or not ",true)
     .setFooter("New commands will be added soon.So,fucking keep patience")
     message.channel.sendEmbed(embed);
    break;



    default:
   // message.reply('Invalid command');

    }


  });

bot.login(token);
