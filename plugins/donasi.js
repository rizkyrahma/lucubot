let fetch = require('node-fetch')
let handler = async (m, { conn }) => await conn.sendButtonLoc(m.chat, await (await fetch(fla + 'donasi')).buffer(), `
╭━━•›ꪶ ۪۪⸙ ━ ━ ━ ━ ꪶ ۪۪⸙‹•━━╮ 
┃╭┈─────────────⩵꙰ཱི࿐ 
┃╰──*DONATE*──➤ ↶↷* 
╰•͙✩̣̣
⁙┃ ુོ DANA : 6285346545126
⁙┃ ુོ OVO    : 6285346545126
⁙┃ ુོ Gopay : 6285346545126
⁙┃ ુོ SAWERIA  : https://saweria.co/raselganz
⁙┃ ુོ INSTAGRAM : https://instagram.com/rasel.ganz
⁙┃ 
⁙╰•°°°🕊°°°°°🕊°°°°°°🕊°°°°°°°°
`.trim(), watermark, 'Konfirmasi', '.konfirm saya ingin donasi njink', m)
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler