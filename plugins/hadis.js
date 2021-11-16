let fetch = require('node-fetch')
let handler = async (m, { usedPrefix, command, args }) => {
    if (!args[0]) throw `Contoh:
${usedPrefix + command} bukhari 1
${usedPrefix + command} abu-daud 1

╭━━•›ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙‹•━━╮
┃╭┈─────────────⩵꙰ཱི࿐
┃╰── *OPSI* ──➤ ↶↷
╰•͙✩̣̣̣̣
⁙┃〲  
⁙┃ ુོ➪ abu-daud
⁙┃〲*⸙ 1 - 4590
⁙┃ ુོ➪ ahmad
⁙┃〲*⸙ 1 - 26363
⁙┃ ુོ➪ bukhari
⁙┃〲*⸙ 1 - 7008
⁙┃ ુོ➪ darimi
⁙┃〲*⸙ 1 - 3367
⁙┃ ુོ➪ ibnu-majah
⁙┃〲*⸙ 1 - 4331
⁙┃ ુོ➪ nasai
⁙┃〲*⸙ 1 - 5662
⁙┃ ુོ➪ malik
⁙┃〲*⸙ 1 - 1594
⁙┃ ુོ➪ muslim
⁙┃〲*⸙ 1 - 5362
⁙┃〲 
⁙╰•°°°🕊°°°°°🕊°°°°°°🕊°°°°°°°°`
    if (!args[1] || isNaN(args[1])) throw `hadis yang ke berapa?\n\ncontoh:\n${usedPrefix + command} muslim 1`
    try {
        let res = await fetch(`https://islamic-api-indonesia.herokuapp.com/api/data/json/hadith/${args[0]}`)
        if (!res.ok) throw eror
        let json = await res.json()
        let { number, arab, id } = json.find(v => v.number == args[1])
        m.reply(`No. ${number}

${arab}

${id}`)
    } catch (e) {
        throw `Tidak ditemukan!`
    }
}
handler.help = ['hadis <nama_hadis> <nomor>']
handler.tags = ['quran']
handler.command = /^(hadist?)$/i
module.exports = handler
//hm
