let fetch = require('node-fetch')
let handler = async (m, { conn }) => await conn.send2ButtonLoc(m.chat, await (await fetch(yamete)).buffer(), `
╭━━•›ꪶ ۪۪⸙ ━ ━ ━ ━ ꪶ ۪۪⸙‹•━━╮ 
┃╭┈─────────────⩵꙰ཱི࿐ 
┃╰── *DONATE* ──➤ ↶↷* 
╰•͙✩̣̣
⁙┃ *⸙ ુོ➪ *EMONEY*
⁙┃ ુོ DANA   : 6285346545126
⁙┃ ુོ OVO      : 6285346545126
⁙┃ ુོ saweria.co/raselganz
⁙┃ ુོ trakteer.id/raselganz/tip
⁙┃ ુོ
⁙┃ *⸙ ુོ➪ *INSTAGRAM OWNER*
⁙┃ ુོ instagram.com/rasel.ganz
⁙┃ 
⁙╰•°°°🕊°°°°°🕊°°°°°°🕊°°°°°°°°
`.trim(), watermark, 'Owner', '.owner', 'Sewa Bot', '.sewa', m)
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
