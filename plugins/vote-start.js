let handler = async (m, { conn, isOwner, isAdmin, text, usedPrefix }) => {
    if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
    conn.vote = conn.vote ? conn.vote : {}
    let id = m.chat
    if (id in conn.vote) {
        await conn.sendButton(m.chat, '_Masih ada vote di chat ini!_', watermark, 'Hapus Vote', `${usedPrefix}hapusvote`, m)
        throw false
    }
    await conn.send2Button(m.chat, `Vote dimulai!

*${usedPrefix}upvote* - untuk ya
*${usedPrefix}devote* - untuk tidak
*${usedPrefix}cekvote* - untuk mengecek vote
*${usedPrefix}hapusvote* - untuk menghapus vote`, watermark, 'Upvote', `${usedPrefix}upvote`, 'Devote', `${usedPrefix}devote`, m)
    conn.vote[id] = [
        text,
        [],
        []
    ]
}
handler.help = ['mulaivote [alasan]']
handler.tags = ['vote']
handler.command = /^(start|mulai)vote$/i
handler.limit = true
handler.group = true

module.exports = handler
