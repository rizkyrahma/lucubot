const fetch = require('node-fetch')

let handler = async (m, { conn }) => {
    let res = await fetch(global.API('xteam', '/randomimage/wpmobile', {}, 'APIKEY'))
    if (!res.ok) throw eror
    let img = await res.buffer()
    if (!img) throw img
    await conn.sendButtonImg(m.chat, await (await fetch(img)).buffer(), 'Wallpapernya bwank', watermark, 'Get Again', '/wallpaper', m)
    //conn.sendFile(m.chat, img, '', watermark, m, 0, { thumbnail: await (await fetch(img)).buffer() })
}
handler.help = ['wallpaperanime']
handler.tags = ['internet']
handler.command = /^(wallpaper|wp)anime$/i
handler.limit = true

module.exports = handler
