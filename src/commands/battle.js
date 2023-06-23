const { MessageEmbed } = require("discord.js");
const GetMemberFromArgument = require("../utilities/GetMemberFromArgument.js");

const base_damage = 15; // Out of 100
const boost_damage = base_damage + 5; // +5 to average the 10 variance - this makes both normal and powerful have the same "average". Powerful is more consistent but less rewarding/punishing.

/*
        15 + 10 = 15-25		(average 20 over 1)
(+20)	35 + 10 = 35-45 	(average 20 over 2)
(+40)	55 + 10 = 55-65 	(average 20 over 3)
*/

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
            
            let damage_amount = "";
            
            if (attacker.base_damage == base_damage)
            {
                damage_amount = `**${damage}** points`;
            }
            else if (attacker.base_damage == base_damage + boost_damage)
            {
                damage_amount = `a powerful **${damage}** points`;
            }
            else if (attacker.base_damage == base_damage + boost_damage * 2)
            {
                damage_amount = `an extra powerful **${damage}** points`;
            }
            
            const damage_moves =
            [
                `**${attacker.displayName}** strikes **${defender.displayName}** for ${damage_amount}.\n`,
                `**${attacker.displayName}** drops, slides under **${defender.displayName}**'s legs and attacks their groin for ${damage_amount}.\n`,
                `**${attacker.displayName}** drops their weapon and pours ${damage_amount} worth of acid into **${defender.displayName}**'s mouth.\n`,
                `**${attacker.displayName}** rushes **${defender.displayName}** and slams into them for ${damage_amount}.\n`,
                `**${defender.displayName}** loses track of **${attacker.displayName}**. **${attacker.displayName}** whispers "Nothing personnel kid" into their ear from behind, before stabbing them for ${damage_amount}.\n`,
                `**${attacker.displayName}** slashes **${defender.displayName}** for ${damage_amount}.\n`,
                `**${attacker.displayName}** relentlessly attacks **${defender.displayName}** for ${damage_amount}.\n`,
                `**${defender.displayName}** trips over, which **${attacker.displayName}** takes advantage of. **${attacker.displayName}** stamps on **${defender.displayName}**'s face for ${damage_amount}.\n`,
                `**${attacker.displayName}** crushes **${defender.displayName}** for ${damage_amount}.\n`,
                `**${attacker.displayName}** has their goons beat up **${defender.displayName}** for ${damage_amount}.\n`,
                `**${attacker.displayName}** stabs **${defender.displayName}** repeatedly for ${damage_amount}.\n`,
                `**${attacker.displayName}** pierces **${defender.displayName}** for ${damage_amount}.\n`,
                `**${attacker.displayName}** exposes **${defender.displayName}** to harmful radiation for ${damage_amount}.\n`,
                `**${attacker.displayName}** smashes **${defender.displayName}** for ${damage_amount}.\n`,
                `**${attacker.displayName}** injects **${defender.displayName}** with a crippling virus for ${damage_amount}.\n`,
                `**${attacker.displayName}** sets **${defender.displayName}** on fire for ${damage_amount}.\n`,
                `**${defender.displayName}** accidentally triggers a trap that **${attacker.displayName}** set earlier. They are hurt for ${damage_amount}.\n`,
                `**${attacker.displayName}** throws their weapon at **${defender.displayName}** for ${damage_amount}.\n`,
                `**${attacker.displayName}** offers **${defender.displayName}** a bouquet of flowers. **${defender.displayName}** is taken aback and for a moment thinks that this might be it. A lover. Someone to save them from the eternal pit of loneliness. On closer inspection, however, it is a bouquet of snakes. They bite **${defender.displayName}** a lot for ${damage_amount}.\n`,
                `**${attacker.displayName}** sprays **${defender.displayName}** with toxic gas for ${damage_amount}.\n`,
                `**${attacker.displayName}** slams a hammer into the side of **${defender.displayName}**'s head for ${damage_amount}.\n`,
                `**${attacker.displayName}** pokes needles into **${defender.displayName}**'s eyes for ${damage_amount}.\n`,
                `**${attacker.displayName}** stamps on **${defender.displayName}**'s pinky toe for ${damage_amount}. It really hurts.\n`,
                `**${attacker.displayName}** trips over and looks like a total idiot, but they still manage to hit **${defender.displayName}** for ${damage_amount}.\n`,
                `**${attacker.displayName}** jumps over **${defender.displayName}**'s head and throws their weapon at them for ${damage_amount}.\n`,
                `**${attacker.displayName}** realises that they can use any weapon. So they fire ***__lasers__*** from their eyes at **${defender.displayName}** for ${damage_amount}.\n`,
            ]
            
            // Choose a random damage move
            rand = Math.floor(Math.random() * damage_moves.length);
            output += damage_moves[rand]; //+= for critical hits
        }
        else
        {
            const skip_moves = 
            [
                `**${attacker.displayName}** falls over and misses their turn!\n`,
                `**${attacker.displayName}** misses their attack!\n`,
                `**${attacker.displayName}** is so distracted by **${defender.displayName}**'s charm that they forget to attack!\n`,
                `**${attacker.displayName}** tries making friends with **${defender.displayName}** but to no avail!\n`,
                `**${attacker.displayName}** is too scared of **${defender.displayName}** to attack!\n`,
                `**${attacker.displayName}** wants to give **${defender.displayName}** a chance, so does nothing.\n`,
                `**${attacker.displayName}** forgets to attack due to how stupid **${defender.displayName}** looks.\n`,
                `**${attacker.displayName}** is distracted by a butterfly.\n`,
                `**${attacker.displayName}** strikes **${defender.displayName}** for 0 damage. **${defender.displayName}** laughs at them.\n`
            ];
            
            // Choose a random excuse
            rand = Math.floor(Math.random() * skip_moves.length);
            output = skip_moves[rand];
        }
        
        //Reset the base damage. So sad if they've charged it for two moves and then missed lmao.
        attacker.base_damage = base_damage;
    }
    else if (rand == 1) // Power up for a powerful attack (+10 then +10 again - max is 35)
    {
        // Don't let them do this if they've already done it twice
        if (attacker.base_damage >= base_damage + boost_damage * 2)
        {
            //TODO: Add variance
            output = `**${attacker.displayName}** tries to power up even further, but is already at their limit!\n`;
        }
        else
        {
            attacker.base_damage += boost_damage;
            
            const power_up_moves =
            [
                `**${attacker.displayName}** prepares to make a powerful attack.\n`,
                `**${attacker.displayName}** readies their weapon for a powerful attack.\n`,
                `**${attacker.displayName}** prays to the heavens that their next attack will do more damage.\n`,
                `**${attacker.displayName}** covers their weapon in something really disgusting (not cum).\n`,
                `**${attacker.displayName}** covers their weapon in something really disgusting (cum).\n`,
                `**${attacker.displayName}** covers their weapon with a deadly poison.\n`,
                `**${attacker.displayName}** assumes an offensive stance.\n`,
                `**${attacker.displayName}** spots a opening in **${defender.displayName}**'s defenses.\n`,
                `**${attacker.displayName}** gathers all of their might for their next attack.\n`,
                `**${attacker.displayName}** takes a deep breath, gathering their energy.\n`,
                `**${attacker.displayName}** is now motivated!\n`,
                `**${attacker.displayName}** injects themselves with a power-up serum.\n`,
                `**${attacker.displayName}** thinks about how cool that girl in the bar would think they are if they won this fight.\n`,
                `**${attacker.displayName}** remembers that they can't lose. They have nobody to destroy their hard drives in the event of their death!\n`,
                `**${attacker.displayName}** performs some sick secret ninjutsu techniques.\n`,
            ];
    
            // Choose a random power up speech
            rand = Math.floor(Math.random() * power_up_moves.length);
            output = power_up_moves[rand];
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
            battle_results.setDescription(output += `**${player_1.displayName}** strikes **${player_2.displayName}** for a godlike **9999** points. \n**${player_2.displayName}** is defeated! **${player_1.displayName}** wins!`);
        }
        else if (player_2.id == 822173127311884299)
        {
            battle_results.setDescription(output += `**${player_2.displayName}** strikes **${player_1.displayName}** for a godlike **9999** points. \n**${player_1.displayName}** is defeated! **${player_2.displayName}** wins!`);
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
            output += `[**${player_1.displayName}**: ${player_1.hp}HP **${player_2.displayName}**: ${player_2.hp}HP]\n\n`;
            output += `**${player_2.displayName}** is defeated! **${player_1.displayName}** wins!`;
            break;
        }
        
        //Player 2 turn 
        output += NewTurn(message, player_2, player_1);
        
        if (player_1.hp <= 0)
        {
            output += `[**${player_1.displayName}**: ${player_1.hp}HP **${player_2.displayName}**: ${player_2.hp}HP]\n\n`;
            output += `**${player_1.displayName}** is defeated! **${player_2.displayName}** wins!`;
            break;
        }
        
        output += `[**${player_1.displayName}**: ${player_1.hp}HP **${player_2.displayName}**: ${player_2.hp}HP]\n\n`;
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
          .setTitle(`${player_1.displayName} versus ${player_2.displayName}`)
          .setDescription(output);

        message.channel.send({ embeds: [battle_results] }).catch(console.error);
    }
  }
};