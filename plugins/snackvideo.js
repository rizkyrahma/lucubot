let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'uhm.. url nya mana?'
  global.API('xteam', '/dl/', {
    url: args[0]
  }, 'APIKEY')
  conn.sendFile(m.chat, url, 'video/mp4', watermark, m)
}
handler.help = ['snackvideo'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^snackvideo$/i
handler.limit = true

module.exports = handler
