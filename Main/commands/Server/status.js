const request = require('request')
const Discord = require('discord.js')

const config = require('../../botconfig.json')
const prefix = config.prefix

module.exports.run = async (bot, message, args) => {
    let server = args[0];

    if(!server) {
        let embed = new Discord.RichEmbed()
        .setTitle("Incorrect Server")
        .setDescription("S1 = Main server\nS2 = Secondary server\nTR = Training server")
        .setColor("#FABF32")
     return message.channel.send(embed)
    }
    else if(server.toUpperCase() === "S1" || server === 's1'){
        IP = "149.56.241.128:30123"
        Title = "JusticeCommunityRP - Main Server"
    }
    else if(server.toUpperCase() === "S2" || server === 's2'){
        IP = "149.56.241.128:30124"
        Title = "JusticeCommunityRP - Secondary Server"
    }
    else if(server.toUpperCase() === "TR" || server === 'tr'){
        IP = "149.56.241.128:30199"
        Title = "JusticeCommunityRP - Training Server"
    }
    else {
        let embed = new Discord.RichEmbed()
        .setTitle("Incorrect Server")
        .setDescription("S1 = Main server\nS2 = Secondary server\nTR = Training server")
        .setColor("#FABF32")
     return message.channel.send(embed)
    }

    try {
        let avatar = "https://i.imgur.com/ODI3OLT.png"
        let api1 = `http://${IP}/players.json`
        let api2 = `http://${IP}/info.json`
        request.get(api2, {timeout: 2000},function (err, response, main) {
            request.get(api1, {timeout: 2000},function (err, response, body) {
                try {
                    var start = JSON.parse(body)
                    var start2 = JSON.parse(main)
            
                    if (start == null || start == []) {
                        var playersCount = 0
                    } else {
                        var playersCount = start.length;
                    }

                    var embed = new Discord.RichEmbed()
                    .setColor("#9ae7ff")
                    .setAuthor(Title , avatar, `http://discourse.jcrpweb.com`)
                    .addField("Server IP", IP)
                    .addField("Status", "Online")
                    .addField("Players", playersCount + " | " + start2.vars.sv_maxClients)
                    .addField("Uptime", start2.vars.Uptime)
                    .addField("Current Roleplay Area", start2.vars.Map)

                    message.channel.send(embed);
                } catch (err) {
                    var embed = new Discord.RichEmbed()
                    .setColor("#FF470F") 
                    .setAuthor(Title , avatar, `http://discourse.jcrpweb.com`)
                    .addField("Server IP", IP)
                    .addField("Status", "Offline")
                    .addField("Players", "No players.")

                    message.channel.send(embed);
                }
            

                })
        
            })
        
    } catch (err) {
        return;
    }

  };
  
  exports.help = {
    name: "status",
  };
  
  