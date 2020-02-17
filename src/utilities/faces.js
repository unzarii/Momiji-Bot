module.exports.getRandom = function()
{
  const faces = ["(≧◡≦)","(＾▽＾)","(￣▽￣)","(>ω<)","(´･ω･`)","(o˘◡˘o)","(o´▽`o)","(＾◡＾)","(๑>ᴗ<๑)","(* >ω<)","(≧▽≦)","(｡^‿^｡)","´･ᴗ･`","(＾▽＾)","(◠﹏◠✿)"];

  var rand = Math.random() * faces.length;
  rand = Math.floor(rand);

  return faces[rand];
}