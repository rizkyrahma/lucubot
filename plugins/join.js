let { MessageType } = require('@adiwajshing/baileys')
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, usedPrefix }) => {
    let [_, code] = text.match(linkRegex) || []
    if (!code) throw 'Link Salah'
    let res = await conn.acceptInvite(code)
    m.reply(`Berhasil join grup ${res.gid}`).then(() => {
        var jumlahHari = 86400000 * 0.5
        var now = new Date() * 1
        if (now < global.db.data.chats[res.gid].expired) global.db.data.chats[res.gid].expired += jumlahHari
        else global.db.data.chats[res.gid].expired = now + jumlahHari
    })
    await conn.sendMessage(res.gid, `*${conn.user.name}* adalah bot whatsapp yang dibangun dengan Nodejs, *${conn.user.name}* ini baru saja bergabung di grup ini diundang oleh @${m.sender.split`@`[0]}
    
ketik *#menu* untuk melihat daftar perintah`, MessageType.text, { contextInfo: { mentionedJid :{
       mediaUrl: ' ',
       mediaType: 4,
       title: 'rasel ×͜×',
       body: 'Whatsapp Developer Bot',
       thumbnailUrl: image,
sourceUrl: 'https://wa.me/6285346545126?text=Assalamualaikum'
}}})
}
handler.help = ['join(-5 limit)']
handler.tags = ['main']
handler.command = /^join$/i

handler.limit = 5

module.exports = handler
