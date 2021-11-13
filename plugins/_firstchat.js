let moment = require('moment-timezone')
let fetch = require ('node-fetch')
let handler = m => m

handler.all = async function (m) {

    if (m.chat.endsWith('broadcast')) return
    if (m.fromMe) return
    if (m.isGroup) return
    if (db.data.settings.groupOnly) return
    let user = global.db.data.users[m.sender]
    let name = conn.user.name
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    await conn.send2ButtonLoc(m.chat, await(await fetch(image)).buffer(), `
Hai, ${ucapan()}

${user.banned ? 'kamu dibanned' : `Saya Adalah Bot Whatsapp Yang Membantu Kamu Menyelesaikan Sesuatu Seperti Membuat Stiker Dan Lainnya.\nAda Yang Bisa Saya Bantu?\n\nKalo Button Gabisa, Manual Aja Dengan Mengetik\n*#menu*\n\nMau Chat Sama Simi? ketik\n*#on simi*`}
`.trim(), watermark, user.banned ? 'Pemilik Bot' : 'Menu', user.banned ? ',owner' : ',?', 'Rules', '.rules', m)
    user.pc = new Date * 1
}

module.exports = handler
function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    res = "Selamat dinihari🌌"
    if (time >= 4) {
        res = "Selamat pagi🌄"
    }
    if (time > 10) {
        res = "Selamat siang🌇"
    }
    if (time >= 15) {
        res = "Selamat sore🌅"
    }
    if (time >= 18) {
        res = "Selamat malam🌆"
    }
    return res
}
