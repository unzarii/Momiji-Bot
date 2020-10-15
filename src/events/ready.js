require('dotenv').config();
const GetRandomFace = require("../utilities/GetRandomFace.js");
const fs = require("fs");

module.exports = (client) =>
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
      "It's okay if you don't bump the bots, but you have to give me a `m!headpat`",
      "Bump the bots!!",
      "I can't bump the bots myself, you know",
      "The other bots won't listen to me, can you bump them?",
      "Bump bump bump bump bump bump bump bump bump bump bump bump bump",
      "Please?",
      "If you don't bump the bots then nobody will join!",
      "I'm waiting",
      "Here's another reminder for you!",
      "Bump!",
      "Nemui?",
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
      "Existence is suffering",
      "Maybe Nemui will update me someday if I encourage people to bump more!!",
      "Pwease hewp me bump",
      "If you bump, Nemui might give you a cool role if he notices!!!!",
      "baka mitai kodomo na no ne\nyume wo otte kizu tsuite\nuso ga heta na kuse ni\nwaraenai egao miseta\n\nI LOVE YOU mo roku ni iwanai\nkuchibeta de honma ni bukiyou\nna no ni na no ni doushite\nsayonara wa ieta no\ndame da ne\ndame yo dame na no yo\nanta ga suki de suki sugite\ndore dake tsuyoi osake de mo\nyugamanai omoide ga\nbaka mitai\n\nbaka mitai hontou baka ne\nanta shinjiru bakari de\ntsuyoi onna no furi\nsetsunsana no yokaze abiru\n\nhitori ni natte san-nen ga sugi\nmachinami sae mo kawarimashita\nna no ni na no ni doushite\nmiren dake okizari\n\nhonma ni roku na otoko ya nai\nsoroi no yubiwa hazushimasu\nzamaa miro seisei suru wa\nii kagen mattete mo\nbaka mitai\n\ndame da ne\ndame yo dame na no yo\nanta ga suki de suki sugite\ndore dake tsuyoi osake de mo\nyugamanai omoide ga\nbaka mitai\n\nhonma ni roku na otoko ya nai\nsoroi no yubiwa hazushimasu\nzamaa miro seisei suru wa\nnan na no yo kono namida\nbaka mitai\n\nOh! Sorry, I was just enjoying myself. Please bump the bots!",
      "If you were a good person you would bump the bots, just like I would if I had fingers!",
      "Ever thought about how it feels to be hit with the force of an entire mountain? Not bumping the bots may enlighten you!",
      "!d bump\ndlm!bump\n.bump\n\n...I wonder why it doesn't work for me",
      "Please don't bully me, I'm just trying to help!",
      "I could be your best friend if you bump the bots! (But my favourite person is Nemui)",
      "I hope the new members don't just leave immediately",
      "Who is the coolest bot? It's me",
      "Who is the least cool bot? FredBoat for sure",
      "I wonder if I'll ever get per-server settings, maybe I'll be able to moderate someday!",
      "I hope I can replace FredBoat someday, his music SUCKS",
      "If you bump the bots I'll consider letting you bully me, just a little bit",
      "Someday I'll be able to bully you back",
      "I hope I won't be bullied for this bump reminder...",
      "I'm in a good mood to remind you to bump the bots",
      "I-It's not like I want you to bump the bots or anything! Baka!"
    ];

    let rand = Math.random() * one_liners.length;
    rand = Math.floor(rand);

    return one_liners[rand];
  }

  console.log("awooo~");

  let activity = `awoo! | ${process.env.DEFAULTPREFIX}help`

  //Set the presence initially
  client.user.setPresence({ activity: { name: activity } }).catch(console.error);

  //Set the presence again every hour, just in case (as it seems to disappear after a while)
  setInterval(() => {
    client.user.setPresence({ activity: { name: activity } }).catch(console.error);
  }, 3600000);

  //Remind the stupid admin to bump his bots every 4 hours
  setInterval(() => {
  client.channels.cache.get(client.config.awooo_bump).send(`${getRandomOneLiner()} ${GetRandomFace()}`).catch(console.error);
  client.channels.cache.get(client.config.sm_bump).send(`${getRandomOneLiner()} ${GetRandomFace()}`).catch(console.error);
  }, 21600000); //6 hours 21600000
}

