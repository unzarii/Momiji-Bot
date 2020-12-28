module.exports = function(message, user_id)
{
  //Select a random image
  const images = ["https://i.imgur.com/iieDV6J.jpg", "https://streamable.com/1hvji8"];
  let rand = Math.random() * images.length;
  rand = Math.floor(rand);

  message.channel.send("<@" + user_id + ">\n" + images[rand]).catch(console.error);

  return;
}