const uploadImage = require("../lib/uploadImage");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let filt = `
balas foto dengan caption opsi di bawah ini:
╭━━•✵ ⃟  ⃟  ⃟✵•
┃
┃ *OPSI : ↷↷*
┃ *〲 greyscale
┃ *〲 invert
┃ *〲 invertgreyscale
┃ *〲 brightness
┃ *〲 threshold
┃ *〲 sepia
┃ *〲 red
┃ *〲 green
┃ *〲 blue
┃ *〲 blurple
┃ *〲 blurple2
┃ *─★‧ﾟ
╰━━━━━━━━⸙
`.trim();
  if (!args[0]) throw filt;
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw filt;
  let media = await q.download();
  let link = await uploadImage(media).catch(
    (_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png"
  );
  conn.sendFile(
    m.chat,
    API("https://some-random-api.ml", "/canvas/" + args[0], {
      avatar: link,
    }),
    "",
    args[0],
    m
  );
};
handler.help = ["filter"].map((v) => v + " <foto>");
handler.tags = ["tools", "update"];
handler.command = /^(f(ilter)?|filters)$/i;
handler.limit = true
module.exports = handler;
