const { quotes } = require('../lib/scrape')
let fetch = require ('node-fetch')
let handler = async (m, { command, args, usedPrefix }) => {
    let er = `contoh:\n${usedPrefix + command} cinta

╭━━•›ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙‹•━━╮
┃╭┈─────────────⩵꙰ཱི࿐
┃╰── *OPSI* ──➤ ↶↷
╰•͙✩̣̣̣̣
⁙┃〲*⸙ cinta  
⁙┃〲*⸙ rindu
⁙┃〲*⸙ mimpi
⁙┃〲*⸙ sabar
⁙┃〲*⸙ sendiri
⁙┃〲*⸙ kesedihan 
⁙┃〲*⸙ pernikahan 
⁙┃〲*⸙ kemerdekaan 
⁙┃〲 
⁙╰•°°°🕊°°°°°🕊°°°°°°🕊°°°°°°°°
`.trim()
    if (!args[0]) throw er
    switch (args[0].toLowerCase()) {
        case 'cinta':
        case 'rindu':
        case 'mimpi':
        case 'sendiri':
        case 'sabar':
        case 'kesedihan':
        case 'pernikahan':
        case 'kemerdekaan':
            quotes(args[0].toLowerCase()).then(async res => {
                let data = JSON.stringify(res)
                let json = JSON.parse(data)
                let random = Math.floor(Math.random() * json.data.length)
                let hasil = json.data[random]
                let { author, bio, quote } = hasil
                await conn.send2ButtonLoc(m.chat, await(await fetch(image)).buffer(), `“${quote}”`.trim(), `${author} - ${bio}`, `KATA BIJAK ${args[0].toUpperCase()}`, `${usedPrefix + command} ${args[0]}`, `RANDOM`, `${usedPrefix + command} ${pickRandom(['rindu', 'mimpi', 'sendiri', 'sabar', 'kesedihan', 'pernikahan', 'kemerdekaan'])}`, m)
            })
            break
        default:
            throw er
    }
}
handler.help = ['katabijak'].map(v => v + ' <opsi>')
handler.tags = ['internet']
handler.command = /^(katabijak|jagokata)$/i

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}
