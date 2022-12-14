module.exports = async(client)=>{
  const fs = require("fs");

  client.once("ready",async(client)=>{
    const status = require("./events/status");
    const command = require("./events/command");

    status(client);
    command(client);
  });

  client.on("messageCreate",async(message)=>{
    //globalchat
    const global = require("./global/global");
    const reply = require("./global/reply");
    const send = require("./global/send");
    global(message,client);
    reply(message,client);
    send(message);

    //event/message
    fs.readdir("./module/events/message/",(err,files)=>{ 
      files.forEach((file) =>{
        if(!file.endsWith(`.js`)) return;
        const event = require(`./events/message/${file}`);
        event(message,client);
      });
    });

    if(!message.channel.type === "GUILD_TEXT" || message.author.bot) return;  

    //console.log
    console.log(`\x1b[37mLOG:(${message.author.tag}[${message.guild.id}])${message.content} PING[${client.ws.ping}ms]`);

    //コマンド
    fs.readdir("./module/commands/",(err,files)=>{ 
      files.forEach((file) =>{
        if(!file.endsWith(`.js`)) return;
        const event = require(`./commands/${file}`);
        event(message,client);
      });
    });
  });

  client.on("messageUpdate",async(oldMessage,newMessage)=>{
    const dissoku = require("./events/dissoku");

    dissoku(newMessage);
  });

  client.on("messageReactionAdd",async(reaction,user)=>{
    if(!reaction.message.channel.type === "GUILD_TEXT" || user.bot) return;  
    return 0;
  });

  client.on("guildCreate",async(guild)=>{
    const invite = require("./events/invite");

    invite(guild);
  });

  client.on("interactionCreate",async(interaction)=>{

    if(!interaction.guild) return await interaction.reply({ 
      embeds:[{
        author: {
          name: "コマンドが実行できません",
          icon_url: "https://cdn.taka.ml/images/system/error.png",
        },
        color: "RED",
        description: "BOTの操作はDMで実行することができません\nサーバー内で実行してください"
      }], 
      ephemeral: true 
    });

    //event/interaction
    fs.readdir("./module/events/interaction/",(err,files)=>{ 
      files.forEach((file) =>{
        if(!file.endsWith(`.js`)) return;
        const event = require(`./events/interaction/${file}`);
        event(interaction,client);
      });
    });
    //slashcommands
    fs.readdir("./module/slashcommands/",(err,files)=>{ 
      files.forEach((file) =>{
        if(!file.endsWith(`.js`)) return;
        const event = require(`./slashcommands/${file}`);
        event(interaction,client);
      });
    });
    //contextmenu
    fs.readdir("./module/contextmenu/",(err,files)=>{ 
      files.forEach((file) =>{
        if(!file.endsWith(`.js`)) return;
        const event = require(`./contextmenu/${file}`);
        event(interaction,client);
      });
    });
  });

  client.on("guildMemberAdd",async(member)=>{
    const join = require("./events/join");
      
    join(member,client);
  });

  client.on("guildMemberRemove",async(member)=>{
    const leave = require("./events/leave");

    leave(member);
  });
}