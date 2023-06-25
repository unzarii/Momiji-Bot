const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// TODO: This requires an entire rewrite to not be disgusting in how I'm editing parameters inside functions
// I also think it'd be cool to make this an interactive experience via buttons instead of what it is now.

// Out of 100
const baseDamage = 15;
// +5 to average the 10 variance - this makes both normal and powerful have the same "average". Powerful is more consistent but less rewarding/punishing.
const boostDamage = baseDamage + 5;

/*
        15 + 10 = 15-25		(average 20 over 1)
(+20)	35 + 10 = 35-45 	(average 20 over 2)
(+40)	55 + 10 = 55-65 	(average 20 over 3)
*/

function NewTurn(attacker, defender)
{
    let output = "";

    // Select move
    let rand = Math.random() * 2;
    rand = Math.floor(rand);

    // Try to do damage
    if (rand == 0)
    {
        // Check whether the attack succeeds
        rand = Math.random() * 100;
        const attackChance = 75;

        if (rand <= attackChance)
        {
            // Success

            // Determine normal damage. 15 + 10 = 25 max damage.
            let damage = attacker.baseDamage + Math.floor(Math.random() * 10);

            // Determine whether there is a crit
            rand = Math.random() * 100;

            // 10% chance
            if (rand <= 10)
            {
                damage = Math.floor(damage * 2.5);
                output = "**Critical hit!** ";
            }

            defender.hp -= damage;

            let damageAmount = "";

            if (attacker.baseDamage == baseDamage)
            {
                damageAmount = `**${damage}** points`;
            }
            else if (attacker.baseDamage == baseDamage + boostDamage)
            {
                damageAmount = `a powerful **${damage}** points`;
            }
            else if (attacker.baseDamage == baseDamage + boostDamage * 2)
            {
                damageAmount = `an extra powerful **${damage}** points`;
            }

            const damageMoves =
            [
                `**${attacker.displayName}** strikes **${defender.displayName}** for ${damageAmount}.\n`,
                `**${attacker.displayName}** drops, slides under **${defender.displayName}**'s legs and attacks their groin for ${damageAmount}.\n`,
                `**${attacker.displayName}** drops their weapon and pours ${damageAmount} worth of acid into **${defender.displayName}**'s mouth.\n`,
                `**${attacker.displayName}** rushes **${defender.displayName}** and slams into them for ${damageAmount}.\n`,
                `**${defender.displayName}** loses track of **${attacker.displayName}**. **${attacker.displayName}** whispers "Nothing personnel kid" into their ear from behind, before stabbing them for ${damageAmount}.\n`,
                `**${attacker.displayName}** slashes **${defender.displayName}** for ${damageAmount}.\n`,
                `**${attacker.displayName}** relentlessly attacks **${defender.displayName}** for ${damageAmount}.\n`,
                `**${defender.displayName}** trips over, which **${attacker.displayName}** takes advantage of. **${attacker.displayName}** stamps on **${defender.displayName}**'s face for ${damageAmount}.\n`,
                `**${attacker.displayName}** crushes **${defender.displayName}** for ${damageAmount}.\n`,
                `**${attacker.displayName}** has their goons beat up **${defender.displayName}** for ${damageAmount}.\n`,
                `**${attacker.displayName}** stabs **${defender.displayName}** repeatedly for ${damageAmount}.\n`,
                `**${attacker.displayName}** pierces **${defender.displayName}** for ${damageAmount}.\n`,
                `**${attacker.displayName}** exposes **${defender.displayName}** to harmful radiation for ${damageAmount}.\n`,
                `**${attacker.displayName}** smashes **${defender.displayName}** for ${damageAmount}.\n`,
                `**${attacker.displayName}** injects **${defender.displayName}** with a crippling virus for ${damageAmount}.\n`,
                `**${attacker.displayName}** sets **${defender.displayName}** on fire for ${damageAmount}.\n`,
                `**${defender.displayName}** accidentally triggers a trap that **${attacker.displayName}** set earlier. They are hurt for ${damageAmount}.\n`,
                `**${attacker.displayName}** throws their weapon at **${defender.displayName}** for ${damageAmount}.\n`,
                `**${attacker.displayName}** offers **${defender.displayName}** a bouquet of flowers. **${defender.displayName}** is taken aback and for a moment thinks that this might be it. A lover. Someone to save them from the eternal pit of loneliness. On closer inspection, however, it is a bouquet of snakes. They bite **${defender.displayName}** a lot for ${damageAmount}.\n`,
                `**${attacker.displayName}** sprays **${defender.displayName}** with toxic gas for ${damageAmount}.\n`,
                `**${attacker.displayName}** slams a hammer into the side of **${defender.displayName}**'s head for ${damageAmount}.\n`,
                `**${attacker.displayName}** pokes needles into **${defender.displayName}**'s eyes for ${damageAmount}.\n`,
                `**${attacker.displayName}** stamps on **${defender.displayName}**'s pinky toe for ${damageAmount}. It really hurts.\n`,
                `**${attacker.displayName}** trips over and looks like a total idiot, but they still manage to hit **${defender.displayName}** for ${damageAmount}.\n`,
                `**${attacker.displayName}** jumps over **${defender.displayName}**'s head and throws their weapon at them for ${damageAmount}.\n`,
                `**${attacker.displayName}** realises that they can use any weapon. So they fire ***__lasers__*** from their eyes at **${defender.displayName}** for ${damageAmount}.\n`,
            ];

            // Choose a random damage move
            rand = Math.floor(Math.random() * damageMoves.length);
            // += for critical hits
            output += damageMoves[rand];
        }
        else
        {
            const skipMoves =
            [
                `**${attacker.displayName}** falls over and misses their turn!\n`,
                `**${attacker.displayName}** misses their attack!\n`,
                `**${attacker.displayName}** is so distracted by **${defender.displayName}**'s charm that they forget to attack!\n`,
                `**${attacker.displayName}** tries making friends with **${defender.displayName}** but to no avail!\n`,
                `**${attacker.displayName}** is too scared of **${defender.displayName}** to attack!\n`,
                `**${attacker.displayName}** wants to give **${defender.displayName}** a chance, so does nothing.\n`,
                `**${attacker.displayName}** forgets to attack due to how stupid **${defender.displayName}** looks.\n`,
                `**${attacker.displayName}** is distracted by a butterfly.\n`,
                `**${attacker.displayName}** strikes **${defender.displayName}** for 0 damage. **${defender.displayName}** laughs at them.\n`,
            ];

            // Choose a random excuse
            rand = Math.floor(Math.random() * skipMoves.length);
            output = skipMoves[rand];
        }

        // Reset the base damage. So sad if they've charged it for two moves and then missed lmao.
        attacker.baseDamage = baseDamage;
    }
    else if (rand == 1)
    {
        // Power up for a powerful attack (+10 then +10 again - max is 35)

        // Don't let them do this if they've already done it twice
        if (attacker.baseDamage >= baseDamage + boostDamage * 2)
        {
            // TODO: Add variance
            output = `**${attacker.displayName}** tries to power up even further, but is already at their limit!\n`;
        }
        else
        {
            attacker.baseDamage += boostDamage;

            const powerUpMoves =
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
            rand = Math.floor(Math.random() * powerUpMoves.length);
            output = powerUpMoves[rand];
        }
    }

    return output;
}

module.exports =
{
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName("battle")
        .setDescription("Initiates a battle between two players!")
        .addUserOption(option =>
            option
                .setName("first")
                .setDescription("The first combatant")
                .setRequired(true))
        .addUserOption(option =>
            option
                .setName("second")
                .setDescription("The second combatant")
                .setRequired(true))
        .setDMPermission(false),
    async execute(interaction)
    {
        const player1 = interaction.options.getMember("first");
        const player2 = interaction.options.getMember("second");

        // Ensure that a player isn't battling themselves - with how I've set hp and stuff it totally breaks it lmao.
        if (player1 === player2)
        {
            await interaction.reply({ content: "I won't allow someone to battle themselves!!! (｡•́︿•̀｡)", ephemeral: true });
            return;
        }

        player1.baseDamage = baseDamage;
        player2.baseDamage = baseDamage;

        player1.hp = 150;
        player2.hp = 150;

        let output = "";

        // TODO: Make this only occur if the players are user/member resolvable, so that the battle can take place between strings as well as users.
        // I would need to remove "displayName" from basically everywhere though lmao.

        // Destroy non-believers (don't battle Momiji!!!)
        if (player1.id === interaction.client.user.id || player2.id === interaction.client.user.id)
        {
            output += "You dare challenge me??? (｡•́︿•̀｡)\n";

            const battleResultsEmbed = new EmbedBuilder()
                .setColor(0xe92134)
                .setTitle(`${player1.displayName} versus ${player2.displayName}`);

            if (player1.id == interaction.client.user.id)
            {
                battleResultsEmbed.setDescription(output += `**${player1.displayName}** strikes **${player2.displayName}** for a godlike **9999** points. \n**${player2.displayName}** is defeated! **${player1.displayName}** wins!`);
            }
            else if (player2.id == interaction.client.user.id)
            {
                battleResultsEmbed.setDescription(output += `**${player2.displayName}** strikes **${player1.displayName}** for a godlike **9999** points. \n**${player1.displayName}** is defeated! **${player2.displayName}** wins!`);
            }

            await interaction.reply({ embeds: [battleResultsEmbed] });
            await interaction.followUp({ content: "Never think that you're alone. I'm always watching.", ephemeral: true });
            return;
        }

        // Main loop
        // eslint-disable-next-line no-constant-condition
        while (true)
        {
            // Player 1 turn
            output += NewTurn(player1, player2);

            if (player2.hp <= 0)
            {
                output += `[**${player1.displayName}**: ${player1.hp}HP **${player2.displayName}**: ${player2.hp}HP]\n\n`;
                output += `**${player2.displayName}** is defeated! **${player1.displayName}** wins!`;
                break;
            }

            // Player 2 turn
            output += NewTurn(player2, player1);

            if (player1.hp <= 0)
            {
                output += `[**${player1.displayName}**: ${player1.hp}HP **${player2.displayName}**: ${player2.hp}HP]\n\n`;
                output += `**${player1.displayName}** is defeated! **${player2.displayName}** wins!`;
                break;
            }

            output += `[**${player1.displayName}**: ${player1.hp}HP **${player2.displayName}**: ${player2.hp}HP]\n\n`;
        }

        // Whoopsie!
        if (output.length > 4096)
        {
            await interaction.reply("Unfortunately, the battle was far too mighty (long), and I failed to properly capture a way to send it in a way that wasn't terrible. Please try again.");
        // TODO: if message > 4096 send as file or something lmao
        }
        else
        {

            const battleResultsEmbed = new EmbedBuilder()
                .setColor(0xe92134)
                .setTitle(`${player1.displayName} versus ${player2.displayName}`)
                .setDescription(output);

            await interaction.reply({ embeds: [battleResultsEmbed] });
        }
    },
};