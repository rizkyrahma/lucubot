let handler = async (m, { conn, isOwner }) => {
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    let caption = `
╭━━•✵ ⃟  ⃟  ⃟✵•
┃
┃ *Chat banned : ↷↷*
┃
┃ *⸙ ુོ➪ Total : ${chats.length} Chat${chats ? '\n' + chats.map(([jid], i) => `
┃ *〲 ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
┃ *〲 ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
┃ *─★‧ﾟ
╰━━━━━━━━⸙

╭━━•✵ ⃟  ⃟  ⃟✵•
┃
┃ *Pengguna Banned : ↷↷*
┃
┃ *⸙ ુོ➪ Total : ${users.length} Pengguna${users ? '\n' + users.map(([jid], i) => `
┃ *〲 ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
┃ *〲 ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
┃ *─★‧ﾟ
╰━━━━━━━━⸙
`.trim()
    conn.reply(m.chat, caption, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } })
}
handler.help = ['bannedlist']
handler.tags = ['info']
handler.command = /^list?ban(ned)?|ban(ned)?list?|daftarban(ned)?$/i

module.exports = handler
