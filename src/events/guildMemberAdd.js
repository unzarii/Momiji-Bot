module.exports = (client, member) =>
{
  console.log(`${member.user.username}#${member.user.discriminator} (${member.user.id}) joined ${member.guild.name} (${member.guild.id})`);
}