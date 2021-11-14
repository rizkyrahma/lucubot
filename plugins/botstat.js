let handler = async (m, { conn }) => {
    let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw } = global.db.data.settings[conn.user.jid]
    const chats = conn.chats.all()
    const groups = chats.filter(v => v.jid.endsWith('g.us'))
    let totaljadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)

    m.reply(`
╭━━•✵ ⃟  ⃟  ⃟✵•
┃
┃ *Status : ↷↷*
┃
┃ *〲 Aktif selama ${uptime}
┃ *〲 Baterai ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
┃ *〲 *${groups.length}* Grup
┃ *〲 *${chats.length - groups.length}* Chat Pribadi
┃ *〲 *${Object.keys(global.db.data.users).length}* Pengguna
┃ *〲 *${totaljadibot.length}* Jadibot
┃ *〲 *${conn.blocklist.length}* Terblock
┃ *〲 *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Chat Terbanned
┃ *〲 *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned
┃ *─★‧ﾟ
╰━━━━━━━━⸙

╭━━•✵ ⃟  ⃟  ⃟✵•
┃
┃ *Pengaturan : ↷↷*
┃
┃ *〲 ${anon ? '✅' : '❌'} *Anon Chat*
┃ *〲 ${anticall ? '✅' : '❌'} *Anti Call*
┃ *〲 ${antispam ? '✅' : '❌'} *Anti Spam*
┃ *〲 ${antitroli ? '✅' : '❌'} *Anti Troli*
┃ *〲 ${backup ? '✅' : '❌'} *Auto Backup DB*
┃ *〲 ${groupOnly ? '✅' : '❌'} *Mode Grup*
┃ *〲 ${jadibot ? '✅' : '❌'} *Jadi Bot*
┃ *〲 ${nsfw ? '✅' : '❌'} *Mode Nsfw*
┃ *─★‧ﾟ
╰━━━━━━━━⸙
    `.trim())
}
handler.help = ['botstatus']
handler.tags = ['info']
handler.command = /^(bot)?stat(us)?$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
