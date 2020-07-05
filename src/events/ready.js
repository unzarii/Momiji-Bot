//TODO: I don't know if I should be adding this as a property to the Discord client, or requiring it here
const faces = require("../utilities/faces.js");
const fs = require("fs");

module.exports = (Discord, client) =>
{
  function getRandomOneLiner()
  {
    const one_liners = [
      "Did you bump the bots yet?",
      "Don't forget to bump the bots",
      "Please bump the bots!",
      "I won't forgive you if you don't bump the bots",
      "Pwease bump the bots",
      "If you bump the bots I'll like you *a lot* a lot",
      "Bumping the bots increases your cool factor by 5%",
      "Headpats for you if you bump the bots",
      "It's okay if you don't bump the bots, but you have to give me a `-headpat`",
      "Bump the bots!!",
      "I can't bump the bots myself, you know",
      "The other bots won't listen to me, can you bump them?",
      "Bump bump bump bump bump bump bump bump bump bump bump bump bump",
      "Please?",
      "If you don't bump the bots then nobody will join!",
      "I'm waiting",
      "Here's another reminder for you!",
      "Bump!",
      "Onii-sama?",
      "Nooooo I don't wanna be ignored noooooooooooo",
      "Being ignored is fine actually",
      "Tag a friend and if they don't bump the bots in five minutes, they owe you an Applie iMac G3/333 (Lime)",
      "I know you don't like me spamming so much, so why not vent that anger into a furious bump!",
      "One day I'll be more than just a bump reminder bot",
      "I see it when you ignore me. I'm watching.",
      "Did you just click on this channel and *not* bump the bots? ",
      "Helloooo please bump the bots",
      "I can't bump the bots so I suuure wish someone else could help me with that",
      "Owo wAnWAn buMp tHe bOts PweAse >:3ccc",
      "Existence is suffering"
    ];

    var rand = Math.random() * one_liners.length;
    rand = Math.floor(rand);

    return one_liners[rand];
  }

  console.log("awooo~");

  //Set the presence initially
  client.user.setPresence({ status: "playing", game: { name: "awooo | -help" } }).catch(console.error);;

  //Prevent the intervals from duplicating if the ready event is somehow fired more than once
  if(client.bump_intervals_started === false)
  {
    //Set the presence again every hour, just in case (as it seems to disappear after a while)
    setInterval(() => {
      client.user.setPresence({ status: "playing", game: { name: "awooo | -help" } });
    }, 3600000);

    //Remind the stupid admin to bump his bots every 4 hours
    setInterval(() => {
    client.channels.get(client.config.awooo_bump).send(`${getRandomOneLiner()} ${faces.getRandom()}`).catch(console.error);
    client.channels.get(client.config.sm_bump).send(`${getRandomOneLiner()} ${faces.getRandom()}`).catch(console.error);
    }, 21600000); //6 hours 21600000

    client.bump_intervals_started = true;
  }
}

