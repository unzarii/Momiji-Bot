const { MessageEmbed } = require("discord.js");
const GetMemberFromArgument = require("../utilities/GetMemberFromArgument.js");

const skip_moves = 
[
    "falls over and misses their turn!",
    "misses their attack!",
    "is so distracted by their opponent's charm that they forget to attack!",
    "tries making friends but to no avail!", "is too scared to attack!",
    "wants to give their opponent a chance, so does nothing.",
    "forgets to attack due to how stupid their opponent looks.",
    "is distracted by a butterfly."
];
const power_up_moves =
[
    "prepares to make a powerful attack.",
    "readies their weapon for a powerful attack.",
    "prays to the heavens that their next attack will do more damage.",
    "covers their weapon in something really disgusting.",
    "gathers all of their might for their next attack."
];

const base_damage = 15; // Out of 100

function NewTurn(message, attacker, defender)
{
    let output = "";
    
    // Select move
    let rand = Math.random() * 2;
    rand = Math.floor(rand);
    
    if (rand == 0) // Try to do damage
    {
        // Check whether the attack succeeds
        rand = Math.random() * 100;
        const attack_chance = 75;
        
        if (rand <= attack_chance) // Success
        {
            // Determine normal damage. 15 + 10 = 25 max damage.
            let damage = attacker.base_damage + Math.floor(Math.random() * 10);
            
            //Determine whether there is a crit
            rand = Math.random() * 100;
            
            if (rand <= 10) // 10% chance
            {
                damage = Math.floor(damage * 2.5);
                output = "**Critical hit!** ";
            }

            defender.hp -= damage;
            
            output += "**"  + attacker.displayName + "** strikes **" + defender.displayName;
            
            if (attacker.base_damage == 15)
            {
                output += "** for **" + damage + "** points. \n";
            }
            else if (attacker.base_damage == 30)
            {
                output += "** for a powerful **" + damage + "** points. \n";
            }
            else if (attacker.base_damage == 45)
            {
                output += "** for an extra powerful **" + damage + "** points. \n";
            }
        }
        else
        {
            // Choose a random excuse
            rand = Math.floor(Math.random() * skip_moves.length);
            output = "**"  + attacker.displayName + "** " + skip_moves[rand] + "\n";
        }
        
        //Reset the base damage. So sad if they've charged it for two moves and then missed lmao.
        attacker.base_damage = base_damage;
    }
    else if (rand == 1) // Power up for a powerful attack (+10 then +10 again - max is 35)
    {
        // Don't let them do this if they've already done it twice
        if (attacker.base_damage >= 45)
        {
            output = "**"  + attacker.displayName + "** tries to power up even further, but is already at their limit!\n";
        }
        else
        {
            // Choose a random power up speech
            rand = Math.floor(Math.random() * power_up_moves.length);
            output = "**"  + attacker.displayName + "** " + power_up_moves[rand] + "\n";
            
            attacker.base_damage += 15;
        }
    }

    return output;
}

module.exports =
{
  usage: "battle <ping> <(optional) ping>",
  description: "Initiates a battle between two players!",
  category: "fun",
  minimum_args: 1,
  permissions: ["SEND_MESSAGES"],
  execute(client, client_permissions, message, args)
  {
    let player_1 = "";
    let player_2 = "";
    
    if (args.length == 1)
    {
      player_1 = message.member;
      player_2 = GetMemberFromArgument(message, args[0]);
    }
    else if (args.length == 2)
    {
        player_1 = GetMemberFromArgument(message, args[0]);
        player_2 = GetMemberFromArgument(message, args[1]);
    }
    else
    {
        //TODO: Add a global maximum arguments
        message.channel.send("Battles can't be any larger than two people!!! (｡•́︿•̀｡)").catch(console.error);
        return;
    }

    // Check that these are actual pings
    if (!player_1 || !player_2)
    {
        // TODO: Throw a proper error
        message.channel.send("Sorry! Players have to be pings or ids!!! (｡•́︿•̀｡)").catch(console.error);
        return;
    }
    
    // Ensure that a player isn't battling themselves - with how I've set hp and stuff it totally breaks it lmao.
    if (player_1 == player_2)
    {
        message.channel.send("I won't allow someone to battle themselves!!! (｡•́︿•̀｡)").catch(console.error);
        return;
    }
    
    player_1.base_damage = base_damage;
    player_2.base_damage = base_damage;

    player_1.hp = 150;
    player_2.hp = 150;
    
    let output = "";
    let turn = 1;
    
    // Destroy non-believers (don't battle Momiji!!!)
    if ((player_1.id == 822173127311884299 && player_2.id != 822173127311884299) || (player_1.id != 822173127311884299 && player_2.id == 822173127311884299))
    {
        output += "You dare challenge me??? (｡•́︿•̀｡)\n";
        
        const battle_results = new MessageEmbed()
          .setColor(0xe92134)
          .setTitle(player_1.displayName + " versus " + player_2.displayName)
        
        if (player_1.id == 822173127311884299)
        {
            battle_results.setDescription(output += "**"  + player_1.displayName + "** strikes **" + player_2.displayName + "** for a godlike **" + 9999 + "** points. \n**" + player_2.displayName + "** is defeated! **" + player_1.displayName + "** wins!");
        }
        else if (player_2.id == 822173127311884299)
        {
            battle_results.setDescription(output += "**"  + player_2.displayName + "** strikes **" + player_1.displayName + "** for a godlike **" + 9999 + "** points. \n**" + player_1.displayName + "** is defeated! **" + player_2.displayName + "** wins!");
        }

        message.channel.send({ embeds: [battle_results] }).catch(console.error);
        return;
    }
    
    while (true)
    {
        // Player 1 turn
        output += NewTurn(message, player_1, player_2);
        
        if (player_2.hp <= 0)
        {
            output += "[**" + player_1.displayName + "**: " + player_1.hp + "HP **" + player_2.displayName + "**: " + player_2.hp + "HP]\n";
            output += "**" + player_2.displayName + "** is defeated! **" + player_1.displayName + "** wins!";
            break;
        }
        
        //Player 2 turn 
        output += NewTurn(message, player_2, player_1);
        
        if (player_1.hp <= 0)
        {
            output += "[**" + player_1.displayName + "**: " + player_1.hp + "HP **" + player_2.displayName + "**: " + player_2.hp + "HP]\n";
            output += "**" + player_1.displayName + "** is defeated! **" + player_2.displayName + "** wins!";
            break;
        }
        
        output += "[**" + player_1.displayName + "**: " + player_1.hp + "HP **" + player_2.displayName + "**: " + player_2.hp + "HP]\n\n";
        turn++;
    }

    if (output.length > 4096)
    {
        message.channel.send("Unfortunately, the battle was far too mighty (long), and I failed to properly capture a way to send it in a way that wasn't terrible. Please try again.").catch(console.error);
        //TODO: if message > 4096 send as file or something lmao
    }
    else
    {
        const battle_results = new MessageEmbed()
          .setColor(0xe92134)
          .setTitle(player_1.displayName + " versus " + player_2.displayName)
          .setDescription(output);

        message.channel.send({ embeds: [battle_results] }).catch(console.error);
    }
  }
};