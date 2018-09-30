const Discord = require("discord.js");

var bot = new Discord.Client();

bot.on("ready", function() {
    bot.user.setGame("| V8-WorlD | Dev by GForceV8 |");
    console.log("Le bot a bien ete connecte")
});

const PREFIX = "!";

const EVERYONE = "@";

bot.on("guildMemberRemove", function(member) {
    member.guild.channels.find("name", "accueil").sendMessage(member.toString() + " viens de quitté le serveur, bye bye !" + " :x:");
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "accueil").sendMessage(member.toString() + " Bienvenue sur le serveur **V8-WorlD** ! :white_check_mark:");
});

bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");
    
    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;

    var roleJoueur= member.guild.roles.find("name", "Membre")
    
    var roleMute = member.guild.roles.find("name", "Mute")
    
    var modlog = member.guild.channels.find("name", "log")
    
    var user = message.mentions.users.first();


    switch (args[0].toLowerCase()) {
            case "unmute":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'exécuter cette commande.");
                if(!modlog) return message.reply("Il n'y a aucun salon log.");
            var member = message.mentions.members.first();
                if (message.mentions.users.size < 1) return message.reply("À qui dois-je retire la sanction: MUTE ?")
                    member.removeRole(roleMute)
                    message.channel.sendMessage(user.toString() + " a bien été unmute ?")
        
            var embed = new Discord.RichEmbed()
                .addField(":desktop: Commande :", "UNMUTE")
                .addField(":bust_in_silhouette: Utilisateur :", user.username)
                .addField(":cop::skin-tone-3: Modérateur :", message.author.username)
                .addField(":clock10: Heure :", message.channel.createdAt)
                .setColor("#0280FD")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setFooter("LOG - UNMUTE - V8-WorlD par @GForceV8#5880")
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            bot.channels.get('181704156170551296').sendMessage(":white_check_mark: Le membre " + user.username + " **a été unmute**.")
            break;
        
            case "mute":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'excécuter cette commande. :x:");
            if(!modlog) return message.reply("Il n'y aucun salon log.");  
            if (!reasontimed) return message.reply("Veuillez précisez la raison du mute.")
                var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("À qui je dois mettre la sanction: MUTE")
                message.channel.sendMessage(member.toString() + " a bien été mute. ?")
                member.addRole(roleMute)

            var embed = new Discord.RichEmbed()
                .addField(":desktop: Action :", "Mute")
                .addField(":bust_in_silhouette: Utilisateur :", user.toString())
                .addField(":cop::skin-tone-3: Modérateur :", message.author.toString())
                .addField(":scroll: Raison :", reasontimed)
                .setColor("#0280FD")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setFooter("LOG - MUTE - V8-WorlD par @GForceV8#5880")
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            bot.channels.get('412561980864462849').sendMessage(":white_check_mark: Le membre " + user.username + " **a été mute** pour : " + reason);
            break;

            case "kick":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'excécuter cette commande. :x:");
            if(!modlog) return message.reply("Il n'y aucun salon log.");
            if (reason.length < 1) return message.reply("Veuillez précisez la raison du kick.");
            if (message.mentions.users.size < 1) return message.reply("Pseudo incomplet.")
            message.guild.member(user).kick();
            message.channel.send(user.toString() + " a bien été kick ?")

            var embed = new Discord.RichEmbed()
                .addField(":desktop: Commande :", "KICK")
                .addField(":bust_in_silhouette: Utilisateur :", user.username)
                .addField(":cop::skin-tone-3: Modérateur :", message.author.username)
                .addField(":scroll: Raison : ", reason)
                .addField(":clock10: Heure :", message.channel.createdAt)
                .setColor("#0280FD")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setFooter("LOG - KICK - V8-WorlD par @GForceV8#5880")
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            bot.channels.get('412561980864462849').sendMessage(":white_check_mark: Le membre " + user.username + " a été kick pour : " + reason);
       
            message.delete();
            break;

            case "ban":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'excécuter cette commande. :x:");
            if(!modlog) return message.reply("Il n'y aucun salon log.");
            if (reason.length < 1) return message.reply("Veuillez précisez la raison du ban.");
            if (message.mentions.users.size < 1) return message.reply("Veuillez mentionné le membre à bannir.")
            
            message.guild.ban(user, 2);
            message.channel.send(user.toString() + " a bien été banni ?")

            var embed = new Discord.RichEmbed()
                .addField(":desktop: Commande :", "BAN")
                .addField(":bust_in_silhouette: Utilisateur :", user.username)
                .addField(":cop::skin-tone-3: Modérateur :", message.author.username)
                .addField(":scroll: Raison : ", reason)
                .addField(":clock10: Heure :", message.channel.createdAt)
                .setColor("#0280FD")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setFooter("LOG - BAN - V8-WorlD par @GForceV8#5880")
                .setTimestamp()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            
            bot.channels.get('412561980864462849').sendMessage(":white_check_mark: Le membre " + user.username + " a été banni pour: " + reason);
            
            message.delete();
            break;

            case "purge":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'excécuter cette commande. :x:");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
            var embed = new Discord.RichEmbed()
                .addField(":desktop: Commande :", "PURGE")
                .addField(":cop::skin-tone-3: Modérateur :", message.author.username)
                .addField(":wastebasket: Message supprimé", messagecount)
                .addField(":clock10: Heure:", message.channel.createdAt)
                .addField(":scroll: Salon :", message.channel)
                .setColor("#0280FD")
                .setFooter("LOG - PURGE - V8-WorlD par @GForceV8#5880")
                .setTimestamp()
            message.delete()
            member.guild.channels.find("name", "log").sendEmbed(embed);
            break;

            case "aide-staff":
            var embed = new Discord.RichEmbed()
                .addField(":rocket: !ban", "Cette commande permet de bannir un utilisateur ! Pour l'utiliser, faites !ban @(utilisateur) + (raison)")
                .addField(":door: !kick", "Cette commande permet de kick un utilisateur ! Pour l'utiliser, faites !kick @(utilisateur) + (raison)")
                .addField(":wastebasket: !purge", "Cette commande permet de supprimé des messages beaucoup plus rapidement ! Pour l'utiliser, faites !purge (nombredemessages)")
                .addField(":mute: !mute", "Cette commande permet de muté un utilisateur. Pour l'utiliser, faites .mute @(utilisateur) + (raison)")
                .addField(":loud_sound: !unmute", "Cette commande permet d'unmute un utilisateur. Pour l'utiliser, faites .unmute @(utilisateur)")
                .addField(":globe_with_meridians: !site","Cette commande vous affiche le lien du site internet de la TeamV8.")
                .addField(":busts_in_silhouette: !membres","Cette commande vous affiche le nombre de membre actuel **sur le serveur Discord** MultiGaming.")
                .addField(":level_slider: !ping","Cette commande vous affiche le ping actuel **du bot**.")
                .setColor("#0280FD")
                .setFooter("Aide - V8-WorlD by @GForceV8")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici la liste des commandes du bot V8-WorlD - By @GForceV8.")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)

                break;
            
	    case "staff":
            var embed = new Discord.RichEmbed()
                .addField(":spy:", "-Fonda/Dev- -GForceV8-")
                .addField(":spy:", "-Co-Fonda/Dev- -yoyomrjack-")
                .addField(":spy:", "---")
                .addField(":spy:", "---")
                .addField(":spy:", "---")
                .addField(":spy:", "---")
                .setColor("#0280FD")
                .setFooter("Staff - V8-WorlD by @GForceV8")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici la liste du staff V8-WorlD - By @GForceV8.")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)

                break;
		    
	    case "stream":
            var embed = new Discord.RichEmbed()
	        --------------------------------------------------------------------------------------------
                .addField(":tv: !gforcev8 ","Cette commande vous affiche le lien de stream de GForceV8")
	        --------------------------------------------------------------------------------------------
                .addField(":tv: !yoyomrjack ","Cette commande vous affiche le lien de stream de yoyomrjack")
	        --------------------------------------------------------------------------------------------
                .addField(":tv: !* ","- A venir -")
	        --------------------------------------------------------------------------------------------
                .addField(":tv: !* ","- A venir -")
	        --------------------------------------------------------------------------------------------
                .addField(":tv: !* ","- A venir -")
	        --------------------------------------------------------------------------------------------
                .addField(":tv: !* ","- A venir -")
	        --------------------------------------------------------------------------------------------
                .setColor("#0280FD")
                .setFooter("Stream - V8-WorlD by @GForceV8")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici la liste des stream V8-WorlD - By @GForceV8.")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)

                break;

            case "aide":
            var embed = new Discord.RichEmbed()
                .addField(":globe_with_meridians: !site","Cette commande vous affiche le lien du site internet du serveur V8-WorlD")
                .setColor("#0280FD")
                .setFooter("V8-WorlD by @GForceV8")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici la liste des commandes du bot V8-WorlD - By @GForceV8.")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)

                break;
 
 
            case "V8-WorlD":
            message.channel.sendMessage("Le bot V8-WorlD est en ligne.");
            break;

            case "site":
            message.channel.sendMessage("Voici le lien du site internet du serveur V8-WorlD: :globe_with_meridians: https://goo.gl/RKa2XA")
            break;

            case "gforcev8":
            message.channel.sendMessage("Voici le lien de la chaîne de live Twitch de GForceV8: :red_circle: https://goo.gl/4DLHDj")
            break;
		    
            case "yoyomrjack":
            message.channel.sendMessage("Voici le lien de la chaîne de live Twitch de yoyomrjack: :red_circle: https://goo.gl/wtAZGm")
            break;

            case "membres":
            message.reply("Nous sommes actuellement " + (bot.users.size - 2) + " membres sur le **serveur Discord V8-WorlD** !");
            break;
            
            case "ping":
            message.channel.sendMessage("Le bot V8-WorlD a actuellement un ping de `" + bot.ping + " ms` ! ");
            message.delete();
            break; 

            default:
            message.channel.sendMessage(":x: Commande invalide. Fait !aide pour voir toutes les commandes disponibles !")
            message.delete();
        }
    });


	bot.login(process.env.TOKEN);
