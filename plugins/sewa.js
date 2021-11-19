let fetch = require('node-fetch')
let { MessageType } = require('@adiwajshing/baileys')
let handler = async(m, { conn }) => {
    let kontol = `╭━━━━•✵ ⃟  ⃟  ⃟✵•
┃
┃ *SEWA BOT : ↷↷*
┃ 
┃ *⸙ ુོ➪ Apa saja keuntungan premium?
┃ *〲 ✅Dapatkan fitur khusus premium.
┃ *〲 ✅Masukkan bot ke group anda.
┃ *〲 ✅Limit UNLIMITED (Tidak Terbatas)
┃ *⸙ ુོ➪ Jadibot & Sewa RDP
┃ *〲 Bisa mengakses fitur owner:
┃ *〲 1. Broadcast Bot 
┃ *〲 2. Hidetag di grup
┃ *〲 3. Run bot di RDP 24jam on
┃ *〲 4. Bot fast respon
┃ *─★‧ﾟ
╰━━━━━━━━⸙
Pembayaran via:
DANA, OVO, GOPAY
    `.trim()
    const button = {
        buttonText: 'List Harga',
        description: kontol,
        sections:  [{title: "Silahkan di pilih", rows: [
        {title: 'Premium', description: "Rp50.000\nDapatkan fitur Premium Permanent.", rowId:".konfir Saya ingin sewa + jadi premium"},
        {title: '4 Bulan', description: "Rp40.000\nSewa bot selama 4 bulan.", rowId:".konfir Saya ingin sewa bot 4 bulan"},
        {title: '3 Bulan', description: "Rp30.000\nSewa bot selama 3 bulan.", rowId:".konfir Saya ingin sewa bot 3 bulan"},
        {title: '2 Bulan', description: "Rp20.000\nSewa bot selama 2 bulan.", rowId:".konfir Saya ingin sewa bot 2 bulan"},
        {title: '1 Bulan', description: "Rp10.000\nSewa bot selama 1 bulan.", rowId:".konfir Saya ingin sewa bot 1 bulan"},
        {title: '2 Minggu', description: "Rp7.000\nSewa bot selama 2 minggu.", rowId:".konfir Saya ingin sewa bot 2 minggu"},
        {title: '1 Minggu', description: "Rp5.000\nSewa bot selama 1 minggu.", rowId:".konfir Saya ingin sewa bot 1 minggu"},
        {title: 'Jadibot sementara', description: "Syarat ketentuan owner", rowId:".konfir Saya ingin jadibot"},
        {title: 'Sewa RDP', description: "Rp20.000 run bot 24jam selama 1 bulan ", rowId:".konfir Saya ingin sewa RDP-nya"},
        {title: 'Owner? ', description: "Chat owner nya jika ada perlu.", rowId:".owner"},
        {title: 'Join?', description: "Cara Memasukkan Bot Ke Grup.", rowId:".join"},
       ] }],
        listType: 1
       }
    conn.sendMessage(m.chat, button, MessageType.listMessage, { quoted: m })
}
handler.tags = ['main', 'update']
handler.command = /^(sewa(bot)?)$/i
handler.help = ['sewa']
module.exports = handler
