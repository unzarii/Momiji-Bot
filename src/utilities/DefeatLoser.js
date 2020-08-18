module.exports = function(message, user_id)
{
  //Select a random image
  const images = ["https://i.imgur.com/iieDV6J.jpg", "https://i.imgur.com/Qz0BRqe.png", "https://i.imgur.com/OxBIVSu.jpg"];
  let rand = Math.random() * images.length;
  rand = Math.floor(rand);

  message.channel.send("<@" + user_id + ">\n" + images[rand]).catch(console.error);

  return;
}