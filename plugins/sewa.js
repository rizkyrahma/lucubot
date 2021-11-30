const { MessageType } = require('@adiwajshing/baileys')
const fs = require('fs')
let handler = async (m, { conn }) => {
  sumberImg = fs.readFileSync(`./src/nadin.jpg`)
  image = (await conn.prepareMessage('0@s.whatsapp.net', sumberImg, MessageType.image, { thumbnail: Buffer.alloc(0) })).message.imageMessage
  res = await conn.prepareMessageFromContent(m.chat, {
    "productMessage": {
      "product": {
        "productImage": image,
        "productId": "4596254207135176",
        "title": "SEWA BOT",
        "description": "SEWA BOT 15K PERBULAN PREMIUM 10K, SEWA+PREMIUM 20K DISCOUNT 5K",
        "retailerId": "#sewa",
        "url": "https://wa.me/+6282256048971",
        "descriptionCount": "999999999",
        "productImageCount": "1",
      },
      "businessOwnerJid": "6285346545126@s.whatsapp.net",
      "contextInfo": {
        "forwardingScore": 9999,
        "isForwarded": true
      }
    }
  },
    { quoted: m })
  conn.relayWAMessage(res)
}
handler.command = /^(sewa)$/
handler.help = ['sewa']
handler.tags = ['main', 'update', 'info']

module.exports = handler
