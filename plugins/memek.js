let handler = async (m, { conn }) => {

  conn.sendFile(m.chat, 'https://jdjd.xyz', '', 'caption', m)
}
handler.help = ['mmk']
handler.tags = ['update']
handler.command = /^(mmk)$/i

handler.limit = 3

module.exports = handler