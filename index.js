const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "/";

Client.on("ready", () => {
    console.log("bot opérationnel");
    Client.guilds.cache.find(guild => guild.id === "706222922070622380").channels.cache.find(channel => channel.id === "706227109496094780").messages.fetch("807614916764106782").then(message => {
        console.log("message ajouté à la mémoire : " + message.content);
    }).catch(err =>{
        console.log("impossible d'ajouter le message en mémoire : " + err);
    });
});

Client.on("guildMemberAdd", member => {
    member.roles.add("807627882268196865").then(mbr => {
        console.log("Rôle attribué avec succès !");
    }).catch(() => {
        console.log("le rôle n'a pas pu être attribué");

    });
});

Client.on("guildMemberRemove", member => {
    console.log("Un membre nous a quitté");
    member.guild.channels.cache.find(channel => channel.id === "706229346700099707").send(member.displayName + "Nous a quitté :sob:\nNous somme désormais plus que " + member.guild.memberCount + "sur le serveur");

})

Client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;

    console.log("reaction ajouté par " + user.username + "\nNom de l'emoji" + reaction.emoji.name);

    if(reaction.message.id === "807614916764106782"){
        if(reaction.emoji.name === "flux"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.add("783356675758620708").then(mbr => {
                console.log("Rôle attribué avec succès pour " + mbr.displayName);
            }).catch(() => {
                console.log("le rôle n'a pas pu être attribué : " + err);
            });    
        }
    }
});

Client.on("messageReactionRemove", (reaction, user) => {
    if(user.bot) return;

    console.log("reaction retiré");
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné");
            }
            else{
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + "a été banni avec succès");
                }
                else{
                    message.reply("Impossible de bannir ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + "a été kick avec succès.");
                }
                else {
                    message.reply("Impossible de kick ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Member non ou mal mentionné.");
            }
            else {
                mention.roles.add("807683912347287582");
                message.channel.send(mention.displayName + " a été mute avec succès");
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Member non ou mal mentionné.");
            }
            else {
                mention.roles.remove("807683912347287582");
                message.channel.send(mention.displayName + " unmute avec succès");
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("807683912347287582");
                setTimeout(function() {
                    mention.roles.remove("807683912347287582")
                    mention.channel.send("<@" + mention.id + "> tu peux désormais parler de nouveau");
                }, args[2] * 1000);
       
            }
            if(message.channel.type == "dm") return;
        }
        
    }
});
    


Client.login("ODA3NTI3Mjg2ODkwMTY4MzIw.YB5SZA.w3mDNxnzfHJTybbNMImgIEeno9c");