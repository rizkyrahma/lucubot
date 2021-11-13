let fetch = require("node-fetch");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `
╭━━•›ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙‹•━━╮
┃╭┈─────────────⩵꙰ཱི࿐
┃╰── *PILIHAN* ──➤ ↶↷
╰•͙✩̣̣̣̣
⁙┃〲  
⁙┃ *⸙ dog
⁙┃ *⸙ cat
⁙┃ *⸙ panda
⁙┃ *⸙ red_panda
⁙┃ *⸙ bird
⁙┃ *⸙ koala
⁙┃ *⸙ fox
⁙┃ *⸙ raccoon 
⁙┃ *⸙ kangaroo
⁙┃〲 
⁙╰•°°°🕊°°°°°🕊°°°°°°🕊°°°°°°°°

contoh:
*${usedPrefix}${command} dog*
`.trim();
  let res = await fetch(
    API("https://some-random-api.ml", "/animal/" + text, {})
  );
  if (!res.ok) throw `${res.status} ${res.statusText}`;
  let json = await res.json();
  if (json.image) await conn.sendFile(m.chat, json.image, "", `${json.fact}`, m);
  else throw json;
};
handler.help = ["animal"].map((v) => v + " <hewan>");
handler.tags = ["internet"];
handler.command = /^(animal|animalfact)$/i;

module.exports = handler;
