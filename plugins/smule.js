let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'uhm.. url nya mana?'
  global.API('lolhum', '/api/smule', 'APIKEY' {
    url: args[0]
  })
  conn.sendFile(m.chat, url, 'video/mp4', watermark, m)
}
handler.help = ['smule'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^smule$/i

module.exports = handler
