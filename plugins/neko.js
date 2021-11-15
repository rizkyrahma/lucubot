let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
  let res = await fetch('https://api.waifu.pics/sfw/neko')
  if (!res.ok) throw eror
  let json = await res.json()
  if (!json.url) throw 'Eror!'
  await conn.sendButtonImg(m.chat, await (await fetch(json.url)).buffer(), 'Nekonya bwank', watermark, 'Get Again', '/neko', m)
  //conn.sendFile(m.chat, json.url, '', watermark, m, 0, { thumbnail: await (await fetch(json.url)).buffer() })
}
handler.help = ['neko']
handler.tags = ['anime']
handler.command = /^neko$/i
//img anime button raselcomel
module.exports = handler
