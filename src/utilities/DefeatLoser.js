module.exports = function(message)
{
  //Select a random image
  const images = ["https://i.imgur.com/iieDV6J.jpg", "https://i.imgur.com/Qz0BRqe.png", "https://i.imgur.com/OxBIVSu.jpg"];
  let rand = Math.random() * images.length;
  rand = Math.floor(rand);

  message.reply(images[rand]).catch(console.error);
  return;
}