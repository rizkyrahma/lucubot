let handler = async (m, { conn, args }) => {
  let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
  try {
    let online = [...Object.keys(conn.chats.get(id).presences), conn.user.jid]
    conn.reply(m.chat, '╭━━•✵ ⃟  ⃟  ⃟✵•\n' + online.map(v => '┃〲 @' + v.replace(/@.+/, '')).join`\n` + '\n┃ *─★‧ﾟ\n╰━━━━━━━━⸙', m, {
      contextInfo: { mentionedJid: online }
    })
  } catch (e) {
    m.reply('')
  }
}
handler.help = ['online']
handler.tags = ['group']
handler.command = /^(here|(list)?online)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false
handler.limit = 3
handler.fail = null

module.exports = handler

