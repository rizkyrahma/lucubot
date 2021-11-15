let { MessageType } = require('@adiwajshing/baileys')
//let handler = async (m, { conn, text, usedPrefix }) => {
//let handler = async m => {    
await conn.sendMessage(res.gid, `
Grup whatsapp bot, jangan lupa join ya su<3
`, MessageType.text, { contextInfo: { externalAdReply :{
       mediaUrl: ' ',
       mediaType: 4,
       title: 'WhatsApp Bot Group',
       body: 'Don\'t forget to join',
       thumbnailUrl: image,
sourceUrl: 'https://chat.whatsapp.com/CUCsW6BWfmJLJwJgPQIaKM'
}}})

handler.help = ['groupbot']
handler.tags = ['info', 'grup']
handler.command = /^g(c|ro?up)bot$/i

module.exports = handler
